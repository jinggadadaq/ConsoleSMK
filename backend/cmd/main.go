package main

import (
	"log"
	"os"

	"backend/internal/database"
	"backend/internal/handler"
	"backend/internal/middleware"
	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
)

func main() {
	// Load environment variables
	err := godotenv.Load("../.env")
	if err != nil {
		err = godotenv.Load()
		if err != nil {
			log.Println("No .env file found or error loading it, using system environment variables")
		}
	}

	appEnv := os.Getenv("APP_ENV")
	if appEnv == "production" {
		gin.SetMode(gin.ReleaseMode)
	}

	router := gin.Default()

	// Global Middlewares
	router.Use(func(c *gin.Context) {
		c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
		c.Writer.Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE, UPDATE")
		c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization")
		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(204)
			return
		}
		c.Next()
	})
	router.Use(middleware.LoggerMiddleware())

	// Koneksi DB
	db := database.Connect()
	defer db.Close()

	// Init Handlers
	authH := handler.NewAuthHandler(db)
	labH := handler.NewLabHandler()
	ujianH := handler.NewUjianHandler()
	userH := handler.NewUserHandler()
	tokenH := handler.NewTokenHandler()
	rewardH := handler.NewRewardHandler()
	logH := handler.NewLogHandler()

	api := router.Group("/api")
	{
		// Health check
		api.GET("/ping", func(c *gin.Context) { c.JSON(200, gin.H{"sukses": true, "pesan": "pong"}) })

		// Auth
		auth := api.Group("/auth")
		{
			auth.POST("/login", authH.Login)
			auth.POST("/logout", authH.Logout)
			auth.POST("/ganti-password", authH.GantiPassword)
			auth.POST("/lupa-password", authH.LupaPassword)
		}

		// Protected Routes
		protected := api.Group("/")
		protected.Use(middleware.AuthMiddleware())
		{
			// Lab Routes
			lab := protected.Group("/lab")
			{
				lab.GET("/saya", labH.AmbilLabSaya)
				lab.GET("/", middleware.RoleMiddleware("admin", "guru"), labH.AmbilSemuaLab)
				lab.POST("/", middleware.RoleMiddleware("admin", "guru"), labH.BuatLab)
				lab.PUT("/:id", middleware.RoleMiddleware("admin", "guru"), labH.EditLab)
				lab.DELETE("/:id", middleware.RoleMiddleware("admin", "guru"), labH.HapusLab)
				lab.POST("/:id/assign", middleware.RoleMiddleware("admin", "guru"), labH.AssignLab)
				lab.POST("/:id/mulai", labH.MulaiSesi)
				lab.POST("/:id/selesai", labH.SelesaiSesi)
			}

			// Ujian Routes
			ujian := protected.Group("/ujian")
			{
				ujian.GET("/saya", ujianH.UjianSaya)
				ujian.GET("/", middleware.RoleMiddleware("admin", "guru"), ujianH.SemuaUjian)
				ujian.POST("/", middleware.RoleMiddleware("admin", "guru"), ujianH.BuatUjian)
				ujian.PUT("/:id", middleware.RoleMiddleware("admin", "guru"), ujianH.EditUjian)
				ujian.DELETE("/:id", middleware.RoleMiddleware("admin", "guru"), ujianH.HapusUjian)
				ujian.POST("/:id/mulai", ujianH.MulaiMengerjakan)
				ujian.POST("/:id/kumpulkan", ujianH.KumpulkanJawaban)
				ujian.GET("/:id/nilai", ujianH.LihatNilai)
			}

			// Admin Routes
			admin := protected.Group("/admin", middleware.RoleMiddleware("admin", "guru"))
			{
				admin.GET("/user", userH.SemuaUser)
				admin.POST("/user", userH.TambahUser)
				admin.PUT("/user/:id", userH.EditUser)
				admin.DELETE("/user/:id", middleware.RoleMiddleware("admin"), userH.HapusUser)
				admin.POST("/user/import", middleware.RoleMiddleware("admin"), userH.ImportCSV)

				admin.POST("/token/generate", tokenH.GenerateToken)
				admin.GET("/token", tokenH.LihatToken)
				admin.DELETE("/token/:id", tokenH.HapusToken)
			}

			// Kelas
			kelas := protected.Group("/kelas", middleware.RoleMiddleware("admin", "guru"))
			{
				kelas.GET("/", userH.SemuaKelas)
				kelas.POST("/", userH.TambahKelas)
			}

			// Reward
			reward := protected.Group("/reward")
			{
				reward.GET("/leaderboard", rewardH.Leaderboard)
				reward.GET("/saya", rewardH.PoinSaya)
			}

			// Log
			protected.GET("/log", middleware.RoleMiddleware("admin", "guru", "siswa"), logH.AmbilLog)
		}
	}

	port := os.Getenv("APP_PORT")
	if port == "" {
		port = "8080"
	}

	log.Printf("Server starting on port %s", port)
	if err := router.Run(":" + port); err != nil {
		log.Fatalf("Failed to start server: %v", err)
	}
}
