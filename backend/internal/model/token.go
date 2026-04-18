package model

import "time"

type Token struct {
	ID        string     `json:"id" db:"id"`
	TokenHash string     `json:"-" db:"token_hash"`
	ClassID   string     `json:"class_id" db:"class_id"`
	CreatedBy string     `json:"created_by" db:"created_by"`
	ExpiresAt time.Time  `json:"expires_at" db:"expires_at"`
	IsActive  bool       `json:"is_active" db:"is_active"`
}

type TokenResponse struct {
	TokenString string `json:"token_string"`
	ClassID     string `json:"class_id"`
	ExpiresAt   string `json:"expires_at"`
}
