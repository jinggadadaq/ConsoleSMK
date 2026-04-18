package model

import "time"

type Lab struct {
	ID              string    `json:"id" db:"id"`
	Title           string    `json:"title" db:"title"`
	Subject         string    `json:"subject" db:"subject"`
	Description     string    `json:"description" db:"description"`
	DurationMinutes int       `json:"duration_minutes" db:"duration_minutes"`
	Difficulty      string    `json:"difficulty" db:"difficulty"`
	CreatedBy       string    `json:"created_by" db:"created_by"`
	CreatedAt       time.Time `json:"created_at" db:"created_at"`
}

type LabSession struct {
	ID         string     `json:"id" db:"id"`
	UserID     string     `json:"user_id" db:"user_id"`
	LabID      string     `json:"lab_id" db:"lab_id"`
	StartedAt  time.Time  `json:"started_at" db:"started_at"`
	FinishedAt *time.Time `json:"finished_at,omitempty" db:"finished_at"`
	Nilai      int        `json:"nilai" db:"nilai"`
	Status     string     `json:"status" db:"status"`
}
