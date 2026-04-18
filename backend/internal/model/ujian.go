package model

import "time"

type Ujian struct {
	ID            string     `json:"id" db:"id"`
	Judul         string     `json:"judul" db:"judul"`
	Jenis         string     `json:"jenis" db:"jenis"`
	MataPelajaran string     `json:"mata_pelajaran" db:"mata_pelajaran"`
	DurasiMenit   int        `json:"durasi_menit" db:"durasi_menit"`
	ClassID       string     `json:"class_id" db:"class_id"`
	Jadwal        *time.Time `json:"jadwal,omitempty" db:"jadwal"`
	DibuatOleh    string     `json:"dibuat_oleh" db:"dibuat_oleh"`
	IsAktif       bool       `json:"is_aktif" db:"is_aktif"`
	CreatedAt     time.Time  `json:"created_at" db:"created_at"`
}
