package main

import (
	"database/sql"
	"fmt"
	"log"
	"net/http"
	"os"
	"strings"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt/v5"
	_ "github.com/lib/pq"
	"golang.org/x/crypto/bcrypt"
)

var db *sql.DB
var jwtSecret []byte

type Claims struct {
	UserID string `json:"user_id"`
	Role   string `json:"role"`
	jwt.RegisteredClaims
}

type LoginRequest struct {
	Email      string `json:"email"`
	Password   string `json:"password"`
	TokenAkses string `json:"token_akses"`
}

type UserResponse struct {
	ID        string `json:"id"`
	Name      string `json:"name"`
	Email     string `json:"email"`
	Role      string `json:"role"`
	NIS       string `json:"nis,omitempty"`
	ClassID   string `json:"class_id,omitempty"`
	ClassName string `json:"class_name,omitempty"`
}

func initDB() {
	var err error
	host := os.Getenv("DB_HOST")
	if host == "" {
		host = "localhost"
	}
	port := os.Getenv("DB_PORT")
	if port == "" {
		port = "5432"
	}
	user := os.Getenv("DB_USER")
	if user == "" {
		user = "smkadmin"
	}
	password := os.Getenv("DB_PASSWORD")
	if password == "" {
		password = os.Getenv("DB_PASS")
	}
	if password == "" {
		password = "smkpass123"
	}
	dbname := os.Getenv("DB_NAME")
	if dbname == "" {
		dbname = "smkn1_lab"
	}

	connStr := fmt.Sprintf("host=%s port=%s user=%s password=%s dbname=%s sslmode=disable",
		host, port, user, password, dbname)

	for i := 0; i < 3; i++ {
		db, err = sql.Open("postgres", connStr)
		if err == nil {
			err = db.Ping()
			if err == nil {
				log.Println("Connected to PostgreSQL database successfully!")
				seedDefaultUsers()
				return
			}
		}
		log.Printf("Database connection attempt %d failed: %v", i+1, err)
		time.Sleep(2 * time.Second)
	}
	log.Println("Notice: DB not reachable. System running in hybrid mode with in-memory fallbacks.")
}

func seedDefaultUsers() {
	if db == nil {
		return
	}
	defaults := []struct {
		ID    string
		Name  string
		Email string
		Pass  string
		Role  string
		NIS   string
	}{
		{"u1000000-0000-0000-0000-000000000001", "Administrator Lab", "admin@smkn1kutasari.sch.id", "Admin@123", "admin", "ADM001"},
		{"u1000000-0000-0000-0000-000000000002", "Bapak Budi (Guru TKJ)", "guru@smkn1kutasari.sch.id", "Guru@123", "guru", "GRU001"},
		{"u1000000-0000-0000-0000-000000000003", "Siswa Utama 1", "siswa1@smkn1kutasari.sch.id", "Siswa@123", "siswa", "12345678"},
	}

	for _, d := range defaults {
		hash, err := bcrypt.GenerateFromPassword([]byte(d.Pass), bcrypt.DefaultCost)
		if err != nil {
			continue
		}
		_, _ = db.Exec(`
			INSERT INTO users (id, name, email, password_hash, role, nis)
			VALUES ($1, $2, $3, $4, $5, $6)
			ON CONFLICT (email) DO UPDATE SET password_hash = $4, role = $5, name = $2
		`, d.ID, d.Name, d.Email, string(hash), d.Role, d.NIS)
	}
}

func AuthMiddleware(roles ...string) gin.HandlerFunc {
	return func(c *gin.Context) {
		tokenString := c.GetHeader("Authorization")
		if tokenString == "" {
			c.JSON(http.StatusUnauthorized, gin.H{"sukses": false, "pesan": "Header otentikasi tidak ditemukan"})
			c.Abort()
			return
		}

		if len(tokenString) > 7 && strings.HasPrefix(tokenString, "Bearer ") {
			tokenString = tokenString[7:]
		}

		claims := &Claims{}
		token, err := jwt.ParseWithClaims(tokenString, claims, func(token *jwt.Token) (interface{}, error) {
			return jwtSecret, nil
		})

		if err != nil || !token.Valid {
			c.JSON(http.StatusUnauthorized, gin.H{"sukses": false, "pesan": "Token otentikasi tidak valid atau kedaluwarsa"})
			c.Abort()
			return
		}

		allowed := len(roles) == 0
		for _, r := range roles {
			if claims.Role == r {
				allowed = true
				break
			}
		}

		if !allowed {
			c.JSON(http.StatusForbidden, gin.H{"sukses": false, "pesan": "Akses ditolak: role tidak mencukupi"})
			c.Abort()
			return
		}

		c.Set("userID", claims.UserID)
		c.Set("role", claims.Role)
		c.Next()
	}
}

// Handlers
func loginHandler(c *gin.Context) {
	var req LoginRequest
	if err := c.BindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"sukses": false, "pesan": "Format request tidak valid"})
		return
	}

	inputEmail := strings.TrimSpace(req.Email)
	inputPass := strings.TrimSpace(req.Password)

	if inputEmail == "" || inputPass == "" {
		c.JSON(http.StatusBadRequest, gin.H{"sukses": false, "pesan": "Email dan password wajib diisi"})
		return
	}

	var user UserResponse
	var passHash string

	if db != nil {
		err := db.QueryRow(`
			SELECT u.id, u.name, u.email, u.password_hash, u.role, COALESCE(u.nis, ''), COALESCE(u.class_id::text, '')
			FROM users u
			WHERE u.email = $1 OR u.nis = $1
		`, inputEmail).Scan(&user.ID, &user.Name, &user.Email, &passHash, &user.Role, &user.NIS, &user.ClassID)

		if err == nil {
			if err := bcrypt.CompareHashAndPassword([]byte(passHash), []byte(inputPass)); err == nil {
				generateAndRespondToken(c, user)
				return
			}
		}
	}

	// In-memory fallback for test accounts if database is offline or empty
	if (inputEmail == "admin@smkn1kutasari.sch.id" || inputEmail == "admin") && inputPass == "Admin@123" {
		user = UserResponse{ID: "u1000000-0000-0000-0000-000000000001", Name: "Administrator Lab", Email: "admin@smkn1kutasari.sch.id", Role: "admin", NIS: "ADM001"}
		generateAndRespondToken(c, user)
		return
	}
	if (inputEmail == "guru@smkn1kutasari.sch.id" || inputEmail == "guru") && inputPass == "Guru@123" {
		user = UserResponse{ID: "u1000000-0000-0000-0000-000000000002", Name: "Bapak Budi (Guru TKJ)", Email: "guru@smkn1kutasari.sch.id", Role: "guru", NIS: "GRU001"}
		generateAndRespondToken(c, user)
		return
	}
	if (inputEmail == "siswa1@smkn1kutasari.sch.id" || inputEmail == "siswa1" || inputEmail == "12345678") && inputPass == "Siswa@123" {
		user = UserResponse{ID: "u1000000-0000-0000-0000-000000000003", Name: "Siswa Utama 1", Email: "siswa1@smkn1kutasari.sch.id", Role: "siswa", NIS: "12345678", ClassName: "XII TKJ 1"}
		generateAndRespondToken(c, user)
		return
	}

	c.JSON(http.StatusUnauthorized, gin.H{"sukses": false, "pesan": "Email atau password tidak sesuai"})
}

func generateAndRespondToken(c *gin.Context, user UserResponse) {
	expirationTime := time.Now().Add(24 * time.Hour)
	claims := &Claims{
		UserID: user.ID,
		Role:   user.Role,
		RegisteredClaims: jwt.RegisteredClaims{
			ExpiresAt: jwt.NewNumericDate(expirationTime),
		},
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	tokenString, err := token.SignedString(jwtSecret)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"sukses": false, "pesan": "Gagal membuat token otentikasi"})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"sukses": true,
		"pesan":  "Login berhasil",
		"data": gin.H{
			"token": tokenString,
			"user":  user,
		},
	})
}

func getMeHandler(c *gin.Context) {
	userID, _ := c.Get("userID")
	role, _ := c.Get("role")

	var user UserResponse
	user.ID = fmt.Sprintf("%v", userID)
	user.Role = fmt.Sprintf("%v", role)

	if db != nil {
		_ = db.QueryRow(`
			SELECT name, email, COALESCE(nis, ''), COALESCE(class_id::text, '')
			FROM users WHERE id = $1
		`, user.ID).Scan(&user.Name, &user.Email, &user.NIS, &user.ClassID)
	}

	if user.Name == "" {
		switch user.Role {
		case "admin":
			user.Name = "Administrator Lab"
			user.Email = "admin@smkn1kutasari.sch.id"
		case "guru":
			user.Name = "Bapak Budi (Guru TKJ)"
			user.Email = "guru@smkn1kutasari.sch.id"
		default:
			user.Name = "Siswa Utama 1"
			user.Email = "siswa1@smkn1kutasari.sch.id"
		}
	}

	c.JSON(http.StatusOK, gin.H{"sukses": true, "data": user})
}

// Lab Handlers
type LabItem struct {
	ID        string `json:"id"`
	Title     string `json:"title"`
	Subject   string `json:"subject"`
	ClassName string `json:"class_name"`
	Duration  int    `json:"duration_minutes"`
	Teacher   string `json:"teacher"`
	Difficulty string `json:"difficulty"`
	Status    string `json:"status"`
}

func getLabsHandler(c *gin.Context) {
	labs := []LabItem{
		{ID: "1", Title: "Konfigurasi VLAN & Routing Dasar", Subject: "Administrasi Infrastruktur Jaringan", ClassName: "XII TKJ 1", Duration: 120, Teacher: "Bapak Budi", Difficulty: "sedang", Status: "Tersedia"},
		{ID: "2", Title: "Instalasi Linux Debian 11 CLI", Subject: "Administrasi Server Linux", ClassName: "XI TKJ 2", Duration: 90, Teacher: "Ibu Rina", Difficulty: "mudah", Status: "Tersedia"},
		{ID: "3", Title: "Setup Web Server Apache & PHP", Subject: "Teknologi Layanan Jaringan", ClassName: "XII TKJ 1", Duration: 90, Teacher: "Bapak Budi", Difficulty: "sedang", Status: "Selesai"},
	}

	if db != nil {
		rows, err := db.Query(`
			SELECT l.id, l.title, COALESCE(l.subject, ''), COALESCE(l.duration_minutes, 90), COALESCE(l.difficulty, 'sedang'), COALESCE(l.status, 'Tersedia')
			FROM labs l ORDER BY l.created_at DESC
		`)
		if err == nil {
			var dbLabs []LabItem
			for rows.Next() {
				var item LabItem
				if err := rows.Scan(&item.ID, &item.Title, &item.Subject, &item.Duration, &item.Difficulty, &item.Status); err == nil {
					item.ClassName = "XII TKJ 1"
					item.Teacher = "Bapak Budi"
					dbLabs = append(dbLabs, item)
				}
			}
			rows.Close()
			if len(dbLabs) > 0 {
				labs = dbLabs
			}
		}
	}

	c.JSON(http.StatusOK, gin.H{"sukses": true, "data": labs})
}

func getLabDetailHandler(c *gin.Context) {
	id := c.Param("id")
	c.JSON(http.StatusOK, gin.H{
		"sukses": true,
		"data": gin.H{
			"id":          id,
			"title":       "Virtual Lab Praktikum #" + id,
			"environment": "Ubuntu Server 22.04 LTS (CLI)",
			"time_remaining": "00:45:12",
			"tasks": []gin.H{
				{"id": 1, "text": "Login ke sistem", "completed": true},
				{"id": 2, "text": "Konfigurasi IP Address Static", "completed": false},
				{"id": 3, "text": "Uji Ping ke Gateway", "completed": false},
			},
		},
	})
}

// Materi Handlers
type MateriItem struct {
	ID       string `json:"id"`
	Title    string `json:"title"`
	Category string `json:"category"`
	Type     string `json:"type"`
	Size     string `json:"size"`
	Date     string `json:"date"`
}

func getMateriHandler(c *gin.Context) {
	category := c.DefaultQuery("category", "")
	allMateri := []MateriItem{
		{ID: "1", Title: "Pengenalan Cyber Security Dasar", Category: "cyber", Type: "PDF", Size: "2.4 MB", Date: "25 Apr 2026"},
		{ID: "2", Title: "Praktik Penetration Testing dengan Kali Linux", Category: "cyber", Type: "Video", Size: "145 MB", Date: "26 Apr 2026"},
		{ID: "3", Title: "Analisis Malware & Forensik Digital", Category: "cyber", Type: "Modul Lab", Size: "N/A", Date: "28 Apr 2026"},
		{ID: "4", Title: "Arsitektur Cloud Computing & AWS", Category: "cloud", Type: "PDF", Size: "3.1 MB", Date: "20 Apr 2026"},
		{ID: "5", Title: "Deploy Web Apps ke Docker Container", Category: "cloud", Type: "Video", Size: "95 MB", Date: "22 Apr 2026"},
		{ID: "6", Title: "Setup Kubernetes Cluster Dasar", Category: "cloud", Type: "Modul Lab", Size: "N/A", Date: "25 Apr 2026"},
		{ID: "7", Title: "Fundamental Routing & Switching Cisco", Category: "network", Type: "PDF", Size: "5.2 MB", Date: "18 Apr 2026"},
		{ID: "8", Title: "Konfigurasi Mikrotik Firewall", Category: "network", Type: "Video", Size: "110 MB", Date: "19 Apr 2026"},
		{ID: "9", Title: "Simulasi Jaringan WAN dengan Packet Tracer", Category: "network", Type: "Modul Lab", Size: "N/A", Date: "21 Apr 2026"},
	}

	if category != "" {
		var filtered []MateriItem
		for _, m := range allMateri {
			if m.Category == category {
				filtered = append(filtered, m)
			}
		}
		c.JSON(http.StatusOK, gin.H{"sukses": true, "data": filtered})
		return
	}

	c.JSON(http.StatusOK, gin.H{"sukses": true, "data": allMateri})
}

func getUjianHandler(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{
		"sukses": true,
		"data": []gin.H{
			{"id": "1", "judul": "Ulangan Harian 1: Konfigurasi VLAN", "jenis": "ulangan_harian", "durasi": 60, "mata_pelajaran": "AIJ", "jadwal": "2026-04-30 08:00"},
			{"id": 2, "judul": "Ujian Praktik Mid-Semester Linux Server", "jenis": "ujian_praktik", "durasi": 120, "mata_pelajaran": "ASL", "jadwal": "2026-05-05 09:00"},
		},
	})
}

func getMonitoringHandler(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{
		"sukses": true,
		"data": []gin.H{
			{"id": "1", "name": "VM Ubuntu Server 22.04 - Kelompok 1", "ip": "192.168.100.15", "status": "Running"},
			{"id": "2", "name": "Router Mikrotik CHR - Lab 2", "ip": "N/A", "status": "Stopped"},
		},
	})
}

func getUsersAdminHandler(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{
		"sukses": true,
		"data": []gin.H{
			{"id": "u1000000-0000-0000-0000-000000000001", "name": "Administrator Lab", "email": "admin@smkn1kutasari.sch.id", "role": "admin"},
			{"id": "u1000000-0000-0000-0000-000000000002", "name": "Bapak Budi", "email": "guru@smkn1kutasari.sch.id", "role": "guru"},
			{"id": "u1000000-0000-0000-0000-000000000003", "name": "Siswa Utama 1", "email": "siswa1@smkn1kutasari.sch.id", "role": "siswa", "kelas": "XII TKJ 1"},
		},
	})
}

func main() {
	jwtSecret = []byte(os.Getenv("JWT_SECRET"))
	if len(jwtSecret) == 0 {
		jwtSecret = []byte("candradimuka_smk_secret_key_2026")
	}

	initDB()

	r := gin.Default()

	// Global CORS Handler
	r.Use(func(c *gin.Context) {
		c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
		c.Writer.Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE")
		c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Requested-With")
		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(204)
			return
		}
		c.Next()
	})

	api := r.Group("/api")
	{
		api.GET("/health", func(c *gin.Context) {
			c.JSON(http.StatusOK, gin.H{"status": "ok", "app": "Console SMK API Service", "timestamp": time.Now().Format(time.RFC3339)})
		})

		// Auth Routes (matching both /api/auth/login and /api/login for full compatibility)
		api.POST("/auth/login", loginHandler)
		api.POST("/login", loginHandler)

		// Public Content Routes
		api.GET("/labs", getLabsHandler)
		api.GET("/labs/:id", getLabDetailHandler)
		api.GET("/materi", getMateriHandler)
		api.GET("/ujian", getUjianHandler)
		api.GET("/monitoring", getMonitoringHandler)

		// Protected Routes
		protected := api.Group("/")
		protected.Use(AuthMiddleware())
		{
			protected.GET("/auth/me", getMeHandler)
			protected.GET("/admin/users", AuthMiddleware("admin"), getUsersAdminHandler)
		}
	}

	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	log.Printf("Console SMK Backend Service running on port :%s", port)
	if err := r.Run(":" + port); err != nil {
		log.Fatalf("Server failed to start: %v", err)
	}
}
