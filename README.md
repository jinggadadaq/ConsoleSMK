# SMKN 1 KUTASARI — LAB CONSOLE

![Go](https://img.shields.io/badge/Go-1.22-00ADD8?style=flat&logo=go)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15-4169E1?style=flat&logo=postgresql)
![Docker](https://img.shields.io/badge/Docker-Ready-2496ED?style=flat&logo=docker)
![Nginx](https://img.shields.io/badge/Nginx-Proxy-009639?style=flat&logo=nginx)
![License MIT](https://img.shields.io/badge/License-MIT-blue.svg)

Platform manajemen lab IT sekolah berstandar profesional untuk SMKN 1 Kutasari. Didesain layaknya SaaS Enterprise, aplikasi ini menyediakan antarmuka bagi siswa dan guru untuk mengatur sesi lab praktikum secara terpusat, lengkap dengan ujian dan monitoring.

## 🚀 Quick Start

1. Clone repositori ini:
   ```bash
   git clone <URL_REPO>
   cd ConsoleSMK
   ```
2. Salin environment vars:
   ```bash
   cp .env.example .env
   ```
3. Sesuaikan isi `.env` dengan kredensial aman (untuk production).
4. Build dan operasikan secara otomatis melalui Docker Compose:
   ```bash
   docker compose up -d
   ```
5. Buka platform di browser Anda melalui `http://localhost`.

## 👥 Akun Default 
Data user default telah disertakan untuk uji coba sistem:
- **Admin**: `admin@smkn1kutasari.sch.id` | Pass: `Admin@123`
- **Guru**: `guru@smkn1kutasari.sch.id` | Pass: `Guru@123`
- **Siswa**: `siswa1@smkn1kutasari.sch.id` | Pass: `Siswa@123`

## 📁 Struktur Direktori
```
.
├── backend/                  # Golang API Service
│   ├── cmd/main.go
│   ├── internal/             # Handlers, Models, Middlewares
│   └── Dockerfile
├── frontend/                 # UI Platform 
│   ├── assets/               # Folder untuk Logo Utama
│   ├── login.html
│   ├── dashboard.html
│   └── lab.html
├── db/
│   └── schema.sql            # PostgreSQL schema
├── nginx/
│   └── nginx.conf            # Reverse proxy setup
└── docker-compose.yml        # Orchestration layer
```

## 🛠 Panduan Logo / Branding
Untuk menyesuaikan tampilan, Anda bisa memperbarui aset yang berada di `frontend/assets`:
- Ganti `logo-smk.png` dengan Logo SMKN 1 Kutasari.
- Ganti `logo-tkj.png` dengan Logo Jurusan TKJ.

## 📡 API Endpoints Reference
Aplikasi menggunakan REST API (`/api/` prefix) yang disediakan oleh backend Go:
- `/api/auth/*` : Otentikasi dan login.
- `/api/lab/*` : Pengelolaan data Lab (guru/admin) dan daftar lab saya (siswa).
- `/api/ujian/*` : Mengambil materi ujian, mengirim tugas.
- `/api/admin/*` : CRUD pengguna & Token akses lab.

## 🖥 Deployment pada Ubuntu Server (Sekolah)
1. Instal Docker & Docker Compose di Server Ubuntu.
2. Tempatkan kode sumber dan pastikan file bereksistensi `.env` terkunci hak aksesnya (`chmod 600 .env`).
3. Konfigurasi Domain Utama di DNS Anda menuju IP Publik Server.
4. Sesuaikan `frontend_url` di environment untuk mendukung CORS jika diperlukan.
5. Jalankan `docker compose up -d`

## 💬 Troubleshooting
- **Frontend tidak dapat tersambung API**: Pastikan variabel port sama dengan setup compose port forwarding, dan cross-origin ditangani di gateway Nginx.
- **Database error / Password Auth**: Cek sinkronisasi PG_PASSWORD di file .env. Pastikan tidak ada karakter khusus yang merusak URI parse jika ada.

## 📜 Lisensi
MIT License
