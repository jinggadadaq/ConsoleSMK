-- schema.sql for SMKN 1 KUTASARI — LAB CONSOLE

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. classes table
CREATE TABLE IF NOT EXISTS classes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(50) NOT NULL,
    grade VARCHAR(10),
    major VARCHAR(50),
    academic_year VARCHAR(10),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. users table
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    role VARCHAR(20) CHECK (role IN ('siswa', 'guru', 'admin')),
    nis VARCHAR(20),
    class_id UUID REFERENCES classes(id) ON DELETE SET NULL,
    is_first_login BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. labs table
CREATE TABLE IF NOT EXISTS labs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(150) NOT NULL,
    subject VARCHAR(100),
    description TEXT,
    duration_minutes INT DEFAULT 90,
    difficulty VARCHAR(10) CHECK (difficulty IN ('mudah', 'sedang', 'sulit')),
    status VARCHAR(20) DEFAULT 'Tersedia',
    created_by UUID REFERENCES users(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. lab assignments
CREATE TABLE IF NOT EXISTS lab_assignments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    lab_id UUID REFERENCES labs(id) ON DELETE CASCADE,
    class_id UUID REFERENCES classes(id) ON DELETE CASCADE,
    deadline TIMESTAMPTZ,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. lab sessions
CREATE TABLE IF NOT EXISTS lab_sessions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    lab_id UUID REFERENCES labs(id) ON DELETE CASCADE,
    started_at TIMESTAMPTZ DEFAULT NOW(),
    finished_at TIMESTAMPTZ,
    nilai INT DEFAULT 0,
    status VARCHAR(20) DEFAULT 'aktif'
);

-- 6. access tokens
CREATE TABLE IF NOT EXISTS access_tokens (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    token_code VARCHAR(50) NOT NULL,
    class_id UUID REFERENCES classes(id) ON DELETE CASCADE,
    created_by UUID REFERENCES users(id) ON DELETE CASCADE,
    expires_at TIMESTAMPTZ,
    is_active BOOLEAN DEFAULT true
);

-- 7. materi (learning materials)
CREATE TABLE IF NOT EXISTS materi (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(150) NOT NULL,
    category VARCHAR(50) NOT NULL CHECK (category IN ('cyber', 'cloud', 'network')),
    type VARCHAR(30) NOT NULL CHECK (type IN ('PDF', 'Video', 'Modul Lab')),
    file_size VARCHAR(20) DEFAULT 'N/A',
    file_url TEXT DEFAULT '#',
    uploaded_by UUID REFERENCES users(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 8. ujian (exams)
CREATE TABLE IF NOT EXISTS ujian (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    judul VARCHAR(100) NOT NULL,
    jenis VARCHAR(30) CHECK (jenis IN ('ulangan_harian', 'ujian_praktik', 'ujian_semester')),
    mata_pelajaran VARCHAR(100),
    durasi_menit INT DEFAULT 60,
    class_id UUID REFERENCES classes(id) ON DELETE CASCADE,
    jadwal TIMESTAMPTZ DEFAULT NOW(),
    dibuat_oleh UUID REFERENCES users(id) ON DELETE SET NULL,
    is_aktif BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 9. pengerjaan ujian
CREATE TABLE IF NOT EXISTS pengerjaan_ujian (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    ujian_id UUID REFERENCES ujian(id) ON DELETE CASCADE,
    mulai_at TIMESTAMPTZ DEFAULT NOW(),
    dikumpulkan_at TIMESTAMPTZ,
    nilai INT DEFAULT 0
);

-- 10. monitoring_nodes (realtime VM monitoring)
CREATE TABLE IF NOT EXISTS monitoring_nodes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(100) NOT NULL,
    group_name VARCHAR(100),
    ip_address VARCHAR(45),
    status VARCHAR(20) DEFAULT 'Running',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 11. activity logs
CREATE TABLE IF NOT EXISTS activity_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE SET NULL,
    aksi VARCHAR(200),
    ip_address VARCHAR(45),
    user_agent TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indeks
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_class ON users(class_id);
CREATE INDEX IF NOT EXISTS idx_materi_category ON materi(category);

-- Seed Data (Default Classes)
INSERT INTO classes (id, name, grade, major, academic_year) VALUES 
('c1000000-0000-0000-0000-000000000001', 'XII TKJ 1', '12', 'Teknik Komputer Jaringan', '2025/2026'),
('c1000000-0000-0000-0000-000000000002', 'XII TKJ 2', '12', 'Teknik Komputer Jaringan', '2025/2026')
ON CONFLICT (id) DO NOTHING;

-- Seed Data (Default Users - Hashes will be ensured by backend auto-seed)
-- Admin@123: $2a$10$w8uQZ0c2N5v5zS/Jp5.V.O/qV0G0M2/1xV8a9O.Z5J5zS/Jp5.V.O
INSERT INTO users (id, name, email, password_hash, role, nis, class_id) VALUES 
('u1000000-0000-0000-0000-000000000001', 'Administrator Lab', 'admin@smkn1kutasari.sch.id', '$2a$10$w8uQZ0c2N5v5zS/Jp5.V.O/qV0G0M2/1xV8a9O.Z5J5zS/Jp5.V.O', 'admin', 'ADM001', NULL),
('u1000000-0000-0000-0000-000000000002', 'Bapak Budi (Guru TKJ)', 'guru@smkn1kutasari.sch.id', '$2a$10$w8uQZ0c2N5v5zS/Jp5.V.O/qV0G0M2/1xV8a9O.Z5J5zS/Jp5.V.O', 'guru', 'GRU001', NULL),
('u1000000-0000-0000-0000-000000000003', 'Siswa Utama 1', 'siswa1@smkn1kutasari.sch.id', '$2a$10$w8uQZ0c2N5v5zS/Jp5.V.O/qV0G0M2/1xV8a9O.Z5J5zS/Jp5.V.O', 'siswa', '12345678', 'c1000000-0000-0000-0000-000000000001')
ON CONFLICT (email) DO NOTHING;

-- Seed Data (Materi)
INSERT INTO materi (title, category, type, file_size) VALUES
('Pengenalan Cyber Security Dasar', 'cyber', 'PDF', '2.4 MB'),
('Praktik Penetration Testing dengan Kali Linux', 'cyber', 'Video', '145 MB'),
('Analisis Malware & Forensik Digital', 'cyber', 'Modul Lab', 'N/A'),
('Arsitektur Cloud Computing & AWS', 'cloud', 'PDF', '3.1 MB'),
('Deploy Web Apps ke Docker Container', 'cloud', 'Video', '95 MB'),
('Setup Kubernetes Cluster Dasar', 'cloud', 'Modul Lab', 'N/A'),
('Fundamental Routing & Switching Cisco', 'network', 'PDF', '5.2 MB'),
('Konfigurasi Mikrotik Firewall', 'network', 'Video', '110 MB'),
('Simulasi Jaringan WAN dengan Packet Tracer', 'network', 'Modul Lab', 'N/A');

-- Seed Data (Labs)
INSERT INTO labs (id, title, subject, description, duration_minutes, difficulty, status, created_by) VALUES
('l1000000-0000-0000-0000-000000000001', 'Konfigurasi VLAN & Routing Dasar', 'Administrasi Infrastruktur Jaringan', 'Praktikum setting VLAN ID dan Trunking pada Switch Cisco', 120, 'sedang', 'Tersedia', 'u1000000-0000-0000-0000-000000000002'),
('l1000000-0000-0000-0000-000000000002', 'Instalasi Linux Debian 11 CLI', 'Administrasi Server Linux', 'Konfigurasi IP Static, SSH, dan Repositori Lokal', 90, 'mudah', 'Tersedia', 'u1000000-0000-0000-0000-000000000002'),
('l1000000-0000-0000-0000-000000000003', 'Setup Web Server Apache & PHP', 'Teknologi Layanan Jaringan', 'Konfigurasi VirtualHost Apache2 dan PHP 8.1', 90, 'sedang', 'Selesai', 'u1000000-0000-0000-0000-000000000002')
ON CONFLICT (id) DO NOTHING;

-- Seed Data (Monitoring Nodes)
INSERT INTO monitoring_nodes (name, group_name, ip_address, status) VALUES
('VM Ubuntu Server 22.04 - Kelompok 1', 'Lab 1', '192.168.100.15', 'Running'),
('Router Mikrotik CHR - Lab 2', 'Lab 2', 'N/A', 'Stopped');
