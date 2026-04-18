package model

import "time"

type User struct {
	ID            string    `json:"id" db:"id"`
	Name          string    `json:"name" db:"name"`
	Email         string    `json:"email" db:"email"`
	PasswordHash  string    `json:"-" db:"password_hash"`
	Role          string    `json:"role" db:"role"`
	NIS           *string   `json:"nis,omitempty" db:"nis"`
	ClassID       *string   `json:"class_id,omitempty" db:"class_id"`
	IsFirstLogin  bool      `json:"is_first_login" db:"is_first_login"`
	CreatedAt     time.Time `json:"created_at" db:"created_at"`
	UpdatedAt     time.Time `json:"updated_at" db:"updated_at"`
}

// UserLoginRequest model untuk request login
type UserLoginRequest struct {
	Email      string `json:"email" binding:"required,email"`
	Password   string `json:"password" binding:"required"`
	TokenAkses string `json:"token_akses"`
}

// ChangePasswordRequest model
type ChangePasswordRequest struct {
	PasswordSaatIni string `json:"password_saat_ini" binding:"required"`
	PasswordBaru    string `json:"password_baru" binding:"required"`
}
