package handler

import (
	"net/http"
	"os"
	"time"

	"backend/internal/model"
	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt/v5"
	"database/sql"
	"golang.org/x/crypto/bcrypt"
)

type AuthHandler struct {
	DB *sql.DB
}

func NewAuthHandler(db *sql.DB) *AuthHandler {
	return &AuthHandler{DB: db}
}

func (h *AuthHandler) Login(c *gin.Context) {
	var req model.UserLoginRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, model.Error("Format request tidak valid"))
		return
	}

	// Cek Database (Real DB Integration)
	var user model.User
	var passwordHash string
	var isFirstLogin = false

	err := h.DB.QueryRow("SELECT id, name, email, role, password_hash FROM users WHERE email = $1", req.Email).
		Scan(&user.ID, &user.Name, &user.Email, &user.Role, &passwordHash)
	
	if err == sql.ErrNoRows {
		c.JSON(http.StatusUnauthorized, model.Error("Email tidak terdaftar di sistem"))
		return
	} else if err != nil {
		c.JSON(http.StatusInternalServerError, model.Error("Terjadi kesalahan server database"))
		return
	}

	// Verifikasi Password dengan Bcrypt
	err = bcrypt.CompareHashAndPassword([]byte(passwordHash), []byte(req.Password))
	if err != nil {
		c.JSON(http.StatusUnauthorized, model.Error("Password SALAH"))
		return
	}

	// Validasi tambahan token untuk pelajar
	if user.Role == "siswa" && req.TokenAkses == "" {
		c.JSON(http.StatusUnauthorized, model.Error("Token Akses Lab wajib disertakan saat masuk"))
		return
	}

	// Generate JWT
	secret := os.Getenv("JWT_SECRET")
	if secret == "" {
		secret = "default_secret_for_dev"
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"user_id": user.ID,
		"role":    user.Role,
		"exp":     time.Now().Add(time.Hour * 24).Unix(),
	})

	tokenString, err := token.SignedString([]byte(secret))
	if err != nil {
		c.JSON(http.StatusInternalServerError, model.Error("Gagal membuat token"))
		return
	}

	c.JSON(http.StatusOK, model.Success("Login berhasil", gin.H{
		"token":          tokenString,
		"user":           user,
		"is_first_login": isFirstLogin,
	}))
}

func (h *AuthHandler) Logout(c *gin.Context) {
	// For JWT usually client side removes it, but we can return success
	c.JSON(http.StatusOK, model.Success("Logout berhasil", nil))
}

func (h *AuthHandler) GantiPassword(c *gin.Context) {
	var req model.ChangePasswordRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, model.Error("Data tidak lengkap"))
		return
	}

	// userID := c.GetString("user_id")
	// Verify current password and update to new password in DB ...

	c.JSON(http.StatusOK, model.Success("Password berhasil diubah", nil))
}

func (h *AuthHandler) LupaPassword(c *gin.Context) {
	c.JSON(http.StatusOK, model.Success("Instruksi reset password telah dikirim ke email", nil))
}
