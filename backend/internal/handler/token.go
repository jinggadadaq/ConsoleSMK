package handler

import (
	"net/http"
	"time"

	"backend/internal/model"
	"github.com/gin-gonic/gin"
)

type TokenHandler struct{}

func NewTokenHandler() *TokenHandler {
	return &TokenHandler{}
}

func (h *TokenHandler) GenerateToken(c *gin.Context) {
	// Mock generate token
	mockToken := model.TokenResponse{
		TokenString: "XJ9-TKJ-2026",
		ClassID:     "c1-xyz",
		ExpiresAt:   time.Now().Add(time.Hour * 8).Format(time.RFC3339),
	}
	c.JSON(http.StatusCreated, model.Success("Token berhasil dibuat", mockToken))
}

func (h *TokenHandler) LihatToken(c *gin.Context) {
	c.JSON(http.StatusOK, model.Success("List Token aktif", []model.TokenResponse{}))
}

func (h *TokenHandler) HapusToken(c *gin.Context) {
	c.JSON(http.StatusOK, model.Success("Token telah dicabut", nil))
}
