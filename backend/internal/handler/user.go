package handler

import (
	"net/http"

	"backend/internal/model"
	"github.com/gin-gonic/gin"
)

type UserHandler struct{}

func NewUserHandler() *UserHandler {
	return &UserHandler{}
}

func (h *UserHandler) SemuaUser(c *gin.Context) {
	c.JSON(http.StatusOK, model.SuccessWithMeta("List Users", []model.User{}, model.Meta{Halaman: 1, Total: 0}))
}

func (h *UserHandler) TambahUser(c *gin.Context) {
	c.JSON(http.StatusCreated, model.Success("User ditambahkan", nil))
}

func (h *UserHandler) EditUser(c *gin.Context) {
	c.JSON(http.StatusOK, model.Success("User diperbarui", nil))
}

func (h *UserHandler) HapusUser(c *gin.Context) {
	c.JSON(http.StatusOK, model.Success("User dihapus", nil))
}

func (h *UserHandler) ImportCSV(c *gin.Context) {
	c.JSON(http.StatusOK, model.Success("Berhasil import data user dari CSV", gin.H{"imported": 35}))
}

// KelasHandlers can be mixed here or detached
func (h *UserHandler) SemuaKelas(c *gin.Context) {
	c.JSON(http.StatusOK, model.Success("List Kelas", []interface{}{}))
}

func (h *UserHandler) TambahKelas(c *gin.Context) {
	c.JSON(http.StatusCreated, model.Success("Kelas ditambahkan", nil))
}
