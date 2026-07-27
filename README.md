# LAB CONSOLE Platform Candradimuka

![Go](https://img.shields.io/badge/Go-1.22+-00ADD8?style=flat&logo=go)
![React](https://img.shields.io/badge/React-18-61DAFB?style=flat&logo=react)
![Vite](https://img.shields.io/badge/Vite-5-646CFF?style=flat&logo=vite)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15-4169E1?style=flat&logo=postgresql)
![Docker](https://img.shields.io/badge/Docker-Ready-2496ED?style=flat&logo=docker)
![Vercel](https://img.shields.io/badge/Vercel-Deployable-000000?style=flat&logo=vercel)
![License MIT](https://img.shields.io/badge/License-MIT-blue.svg)

Platform manajemen lab IT sekolah berstandar profesional untuk **SMKN 1 Kutasari**. Didesain layaknya SaaS Enterprise, aplikasi ini menyediakan antarmuka bagi siswa, guru, dan admin untuk mengatur sesi lab praktikum secara terpusat, materi pembelajaran, ujian online, dan monitoring realtime VM/Router lab.

---

## ⚡ Quick Start (Pengembangan Lokal)

### Opsi A: Menggunakan Docker Compose (Direkomendasikan)
1. Clone repositori ini:
   ```bash
   git clone https://github.com/jinggadadaq/ConsoleSMK.git
   cd ConsoleSMK
   ```
2. Jalankan seluruh service (Frontend, Backend, PostgreSQL, PgAdmin):
   ```bash
   docker compose up -d
   ```
3. Buka platform di browser: `http://localhost`

### Opsi B: Tanpa Docker (Local Manual)
1. **Database PostgreSQL**: Pastikan PostgreSQL aktif dan eksekusi file `db/schema.sql` untuk membuat tabel & seed data awal.
2. **Backend (Golang)**:
   ```bash
   cd backend
   go run main.go
   ```
   *Backend akan berjalan di `http://localhost:8080`.*
3. **Frontend (React + Vite)**:
   ```bash
   cd frontend
   npm install
   npm run dev
   ```
   *Frontend akan berjalan di `http://localhost:5173`.*

---

## 👥 Akun Default (Uji Coba Sistem)
Data user default telah di-seed secara otomatis ke sistem:

| Role | Email / ID | Password | Akses |
| :--- | :--- | :--- | :--- |
| **Admin** | `admin@smkn1kutasari.sch.id` | `Admin@123` | Full Admin Console & User Mgmt |
| **Guru** | `guru@smkn1kutasari.sch.id` | `Guru@123` | Pengelolaan Lab & Upload Materi |
| **Siswa** | `siswa1@smkn1kutasari.sch.id` | `Siswa@123` | Akses Virtual Lab & Materi |

---

## 🌐 Panduan Deployment

### 1. Deployment di Server VPS / Ubuntu Server Sekolah (Self-Hosted)

Metode ini cocok untuk deployment lokal sekolah (LAN) atau VPS Linux (Debian/Ubuntu).

1. **Persiapan Server**:
   ```bash
   sudo apt update && sudo apt install -y docker.io docker-compose git
   ```
2. **Clone repositori**:
   ```bash
   git clone https://github.com/jinggadadaq/ConsoleSMK.git
   cd ConsoleSMK
   ```
3. **Konfigurasi Domain & SSL (Certbot)**:
   Jika menggunakan domain publik (misal: `lab.smkn1kutasari.sch.id`):
   ```bash
   sudo apt install -y certbot python3-certbot-nginx
   sudo certbot --nginx -d lab.smkn1kutasari.sch.id
   ```
4. **Jalankan Container**:
   ```bash
   docker compose up -d --build
   ```

---

### 2. Deployment Cloud Gratisan (Vercel + Railway / Render + Supabase)

Jika ingin memublikasikan aplikasi secara gratis ke cloud internet tanpa server sendiri:

#### Step A: Database PostgreSQL (Supabase / Neon / Railway)
1. Buat project baru di [Supabase](https://supabase.com) atau [Neon.tech](https://neon.tech).
2. Dapatkan **Connection String URI** PostgreSQL (contoh: `postgres://user:pass@ep-xyz.supabase.co:5432/postgres`).
3. Jalankan isi file `db/schema.sql` pada SQL Editor Supabase/Neon untuk menginisialisasi tabel & seed data.

#### Step B: Deploy Backend API (Railway / Render / Fly.io)
1. Push repositori ini ke GitHub Anda.
2. Buka [Railway.app](https://railway.app) atau [Render.com](https://render.com).
3. Buat **New Web Service**, pilih root folder `/backend` (menggunakan `Dockerfile` backend).
4. Isikan **Environment Variables** pada dashboard Railway/Render:
   - `DB_HOST`: Host database cloud (misal `ep-xyz.supabase.co`)
   - `DB_PORT`: `5432`
   - `DB_USER`: Username database
   - `DB_PASSWORD`: Password database
   - `DB_NAME`: `postgres`
   - `JWT_SECRET`: Untaian karakter rahasia acak
5. Deploy service. Anda akan mendapatkan URL backend (misal: `https://console-smk-backend.up.railway.app`).

#### Step C: Deploy Frontend di Vercel
1. Buka [Vercel.com](https://vercel.com) dan hubungkan akun GitHub Anda.
2. Import repositori **ConsoleSMK**.
3. Atur konfigurasi project:
   - **Framework Preset**: `Vite`
   - **Root Directory**: `frontend`
4. Tambahkan **Environment Variable** jika diperlukan:
   - `VITE_API_URL`: `https://console-smk-backend.up.railway.app`
5. Klik **Deploy**.
6. File `frontend/vercel.json` secara otomatis telah menangani *Single Page Application (SPA) routing* agar URL seperti `/login` dan `/dashboard` tidak mengalami 404 saat di-refresh.

---

## 📁 Struktur Direktori Proyek

```
.
├── backend/                  # Golang REST API Service
│   ├── main.go               # Handlers, JWT, & CORS Router
│   ├── go.mod / go.sum
│   └── Dockerfile
├── frontend/                 # UI Platform (React + Vite)
│   ├── vercel.json           # Konfigurasi SPA rewrite Vercel
│   ├── src/
│   │   ├── pages/            # Login, Dashboard, Lab, Materi, Sertifikat
│   │   ├── components/       # Sidebar, Topbar
│   │   └── context/          # ThemeContext (Dark/Light Mode)
│   └── Dockerfile
├── db/
│   └── schema.sql            # PostgreSQL schema + Seed data
├── nginx/
│   └── nginx.conf            # Nginx Reverse Proxy setup
└── docker-compose.yml        # Multi-container Orchestration
```

---

## 📡 Referensi API Endpoints

- `POST /api/auth/login` : Login user (mengembalikan token JWT & profil user).
- `GET  /api/auth/me`    : Mendapatkan profil user aktif (Header `Authorization: Bearer <token>`).
- `GET  /api/labs`       : Mengambil daftar lab praktikum aktif.
- `GET  /api/labs/:id`   : Detail environment virtual lab.
- `GET  /api/materi`     : Katalog materi pembelajaran (filter per kategori `cyber`, `cloud`, `network`).
- `GET  /api/monitoring` : Status realtime server VM/Router lab.
- `GET  /api/ujian`      : Daftar ulangan harian & ujian praktik.

---

## 💬 Troubleshooting

- **Frontend tidak dapat terhubung ke Backend API**:
  - Pastikan backend API aktif dan CORS diizinkan.
  - Jika menggunakan Vercel, pastikan URL API backend menggunakan protokol `https://`.
- **Database Connection Error**:
  - Pastikan konfigurasi host, username, password, dan nama database sudah benar di environment variables server/container.
  - Untuk PostgreSQL cloud (seperti Supabase/Neon), pastikan SSL mode diizinkan.

---

## 📜 Lisensi
Lisensi [MIT](LICENSE) — SMKN 1 Kutasari
