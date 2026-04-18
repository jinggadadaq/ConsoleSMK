-- users table
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    role VARCHAR(10) CHECK (role IN ('siswa', 'guru', 'admin')),
    nis VARCHAR(20),
    class_id UUID,
    is_first_login BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- classes table
CREATE TABLE classes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(50) NOT NULL,
    grade VARCHAR(10),
    major VARCHAR(50),
    academic_year VARCHAR(10),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- update user relation
ALTER TABLE users ADD CONSTRAINT fk_user_class FOREIGN KEY (class_id) REFERENCES classes(id);

-- labs table
CREATE TABLE labs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(100) NOT NULL,
    subject VARCHAR(100),
    description TEXT,
    duration_minutes INT,
    difficulty VARCHAR(10) CHECK (difficulty IN ('mudah', 'sedang', 'sulit')),
    created_by UUID REFERENCES users(id),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- lab assignments
CREATE TABLE lab_assignments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    lab_id UUID REFERENCES labs(id),
    class_id UUID REFERENCES classes(id),
    deadline TIMESTAMPTZ,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- lab sessions
CREATE TABLE lab_sessions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id),
    lab_id UUID REFERENCES labs(id),
    started_at TIMESTAMPTZ,
    finished_at TIMESTAMPTZ,
    nilai INT DEFAULT 0,
    status VARCHAR(20)
);

-- access tokens
CREATE TABLE access_tokens (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    token_hash TEXT NOT NULL,
    class_id UUID REFERENCES classes(id),
    created_by UUID REFERENCES users(id),
    expires_at TIMESTAMPTZ,
    is_active BOOLEAN DEFAULT true
);

-- ujian (exams)
CREATE TABLE ujian (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    judul VARCHAR(100) NOT NULL,
    jenis VARCHAR(20) CHECK (jenis IN ('ulangan_harian', 'ujian_praktik', 'ujian_semester')),
    mata_pelajaran VARCHAR(100),
    durasi_menit INT,
    class_id UUID REFERENCES classes(id),
    jadwal TIMESTAMPTZ,
    dibuat_oleh UUID REFERENCES users(id),
    is_aktif BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- pengerjaan ujian (exam sessions)
CREATE TABLE pengerjaan_ujian (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id),
    ujian_id UUID REFERENCES ujian(id),
    mulai_at TIMESTAMPTZ,
    dikumpulkan_at TIMESTAMPTZ,
    nilai INT DEFAULT 0
);

-- reward points
CREATE TABLE reward_points (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id),
    poin INT DEFAULT 0,
    alasan TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- activity logs
CREATE TABLE activity_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id),
    aksi VARCHAR(200),
    ip_address VARCHAR(45),
    user_agent TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indeks
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_class ON users(class_id);
CREATE INDEX idx_lab_assignments_class ON lab_assignments(class_id);
CREATE INDEX idx_ujian_class ON ujian(class_id);
CREATE INDEX idx_logs_user ON activity_logs(user_id);
CREATE INDEX idx_logs_created ON activity_logs(created_at DESC);

-- Seed Data (Basic)
-- Kelas:
INSERT INTO classes (id, name, grade, major, academic_year) VALUES 
('c1000000-0000-0000-0000-000000000001', 'XII TKJ 1', '12', 'Teknik Komputer Jaringan', '2025/2026'),
('c1000000-0000-0000-0000-000000000002', 'XII TKJ 2', '12', 'Teknik Komputer Jaringan', '2025/2026');

-- Note: Passwords are plain text here just for the sake of standard SQL but in production would be bcrypt. 
-- Assuming standard bcrypt for "Admin@123", "Guru@123", "Siswa@123". Use bcrypt in Go seeding.
