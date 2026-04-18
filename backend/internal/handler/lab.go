package handler

import (
	"net/http"

	"backend/internal/model"
	"github.com/gin-gonic/gin"
)

type LabHandler struct{}

func NewLabHandler() *LabHandler {
	return &LabHandler{}
}

func (h *LabHandler) AmbilLabSaya(c *gin.Context) {
	// Mock data for student
	labs := []model.Lab{
		{ID: "l1", Title: "Lab Linux Server Dasar", Subject: "Administrasi Server"},
		{ID: "l2", Title: "Lab Keamanan Jaringan", Subject: "Cyber Security"},
	}
	c.JSON(http.StatusOK, model.Success("Berhasil mengambil data lab saya", labs))
}

func (h *LabHandler) AmbilSemuaLab(c *gin.Context) {
	c.JSON(http.StatusOK, model.Success("Berhasil mengambil semua rute lab", []model.Lab{}))
}

func (h *LabHandler) BuatLab(c *gin.Context) {
	c.JSON(http.StatusCreated, model.Success("Lab berhasil dibuat", nil))
}

func (h *LabHandler) EditLab(c *gin.Context) {
	c.JSON(http.StatusOK, model.Success("Lab berhasil diperbarui", nil))
}

func (h *LabHandler) HapusLab(c *gin.Context) {
	c.JSON(http.StatusOK, model.Success("Lab berhasil dihapus", nil))
}

func (h *LabHandler) AssignLab(c *gin.Context) {
	c.JSON(http.StatusOK, model.Success("Lab berhasil di-assign ke kelas", nil))
}

func (h *LabHandler) MulaiSesi(c *gin.Context) {
	c.JSON(http.StatusOK, model.Success("Sesi lab dimulai", gin.H{"status": "aktif"}))
}

func (h *LabHandler) SelesaiSesi(c *gin.Context) {
	c.JSON(http.StatusOK, model.Success("Sesi lab selesai", gin.H{"nilai": 95}))
}
