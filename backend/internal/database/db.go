package database

import (
	"database/sql"
	"fmt"
	"log"
	"os"

	_ "github.com/lib/pq"
	"golang.org/x/crypto/bcrypt"
)

func Connect() *sql.DB {
	host := os.Getenv("DB_HOST")
	port := os.Getenv("DB_PORT")
	user := os.Getenv("DB_USER")
	password := os.Getenv("DB_PASS")
	dbname := os.Getenv("DB_NAME")

	psqlInfo := fmt.Sprintf("host=%s port=%s user=%s password=%s dbname=%s sslmode=disable",
		host, port, user, password, dbname)

	db, err := sql.Open("postgres", psqlInfo)
	if err != nil {
		log.Fatalf("Gagal membuka koneksi database: %v", err)
	}

	err = db.Ping()
	if err != nil {
		log.Printf("Peringatan: Database (%s:%s) tidak merespon saat startup. Pastikan PostgreSQL berjalan.", host, port)
	} else {
		log.Println("✅ Berhasil terhubung ke database PostgreSQL")
		SeedInitialUsers(db) // Panggil seed setiap connect buat memastikan login bisa jalan
	}

	return db
}

// SeedInitialUsers injects default users so login works out of the box
func SeedInitialUsers(db *sql.DB) {
	// Buat password hash "Admin@123"
	hashAdmin, _ := bcrypt.GenerateFromPassword([]byte("Admin@123"), bcrypt.DefaultCost)
	// Buat password hash "Siswa@123"
	hashSiswa, _ := bcrypt.GenerateFromPassword([]byte("Siswa@123"), bcrypt.DefaultCost)

	// Inject Admin
	sqlAdmin := `
		INSERT INTO users (id, name, email, role, password_hash)
		VALUES ('44aa0000-0000-0000-0000-000000000001', 'Administrator', 'admin@smkn1kutasari.sch.id', 'admin', $1)
		ON CONFLICT (email) DO NOTHING;
	`
	db.Exec(sqlAdmin, string(hashAdmin))

	// Inject Siswa (Budi)
	sqlSiswa := `
		INSERT INTO users (id, name, email, role, password_hash)
		VALUES ('55bb0000-0000-0000-0000-000000000002', 'Budi Santoso', 'siswa1@smkn1kutasari.sch.id', 'siswa', $1)
		ON CONFLICT (email) DO NOTHING;
	`
	db.Exec(sqlSiswa, string(hashSiswa))
}
