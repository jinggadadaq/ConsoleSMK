package handler

import (
	"net/http"

	"backend/internal/model"
	"github.com/gin-gonic/gin"
)

type UjianHandler struct{}

func NewUjianHandler() *UjianHandler {
	return &UjianHandler{}
}

func (h *UjianHandler) UjianSaya(c *gin.Context) {
	mockUjian := []model.Ujian{
		{ID: "u1", Judul: "Ulangan Harian — Jaringan Komputer", Jenis: "ulangan_harian", DurasiMenit: 45},
	}
	c.JSON(http.StatusOK, model.Success("Berhasil memuat ujian", mockUjian))
}

func (h *UjianHandler) SemuaUjian(c *gin.Context) {
	c.JSON(http.StatusOK, model.Success("Berhasil memuat semua ujian", []model.Ujian{}))
}

func (h *UjianHandler) BuatUjian(c *gin.Context) {
	c.JSON(http.StatusCreated, model.Success("Ujian berhasil dibuat", nil))
}

func (h *UjianHandler) EditUjian(c *gin.Context) {
	c.JSON(http.StatusOK, model.Success("Ujian berhasil diperbarui", nil))
}

func (h *UjianHandler) HapusUjian(c *gin.Context) {
	c.JSON(http.StatusOK, model.Success("Ujian berhasil dihapus", nil))
}

func (h *UjianHandler) MulaiMengerjakan(c *gin.Context) {
	c.JSON(http.StatusOK, model.Success("Mulai mengerjakan ujian", gin.H{"sesi": "started"}))
}

func (h *UjianHandler) KumpulkanJawaban(c *gin.Context) {
	c.JSON(http.StatusOK, model.Success("Jawaban berhasil dikumpulkan", gin.H{"nilai_sementara": "pending"}))
}

func (h *UjianHandler) LihatNilai(c *gin.Context) {
	c.JSON(http.StatusOK, model.Success("Nilai ujian", gin.H{"nilai": 88}))
}
