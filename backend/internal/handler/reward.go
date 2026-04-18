package handler

import (
	"net/http"

	"backend/internal/model"
	"github.com/gin-gonic/gin"
)

type RewardHandler struct{}

func NewRewardHandler() *RewardHandler {
	return &RewardHandler{}
}

func (h *RewardHandler) Leaderboard(c *gin.Context) {
	// Mock leaderboard
	lb := []map[string]interface{}{
		{"peringkat": 1, "nama_siswa": "Andi Saputra", "poin": 1200},
		{"peringkat": 2, "nama_siswa": "Budi Santoso", "poin": 980},
	}
	c.JSON(http.StatusOK, model.Success("Data Leaderboard", lb))
}

func (h *RewardHandler) PoinSaya(c *gin.Context) {
	c.JSON(http.StatusOK, model.Success("Poin berhasil dimuat", gin.H{"poin": 450, "riwayat": []string{}}))
}
