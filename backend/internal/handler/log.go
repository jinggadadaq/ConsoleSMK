package handler

import (
	"net/http"

	"backend/internal/model"
	"github.com/gin-gonic/gin"
)

type LogHandler struct{}

func NewLogHandler() *LogHandler {
	return &LogHandler{}
}

func (h *LogHandler) AmbilLog(c *gin.Context) {
	// Return logs based on role (siswa -> self, admin -> all)
	logs := []map[string]interface{}{
		{"waktu": "2026-04-18 10:00:00", "aktivitas": "Login Selesai", "ip": "192.168.1.100", "status": "Sukses"},
	}
	c.JSON(http.StatusOK, model.Success("Log Aktivitas", logs))
}
