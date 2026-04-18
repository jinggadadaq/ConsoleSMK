package middleware

import (
	"net/http"

	"backend/internal/model"
	"github.com/gin-gonic/gin"
)

// RoleMiddleware checks if the user has the required role
func RoleMiddleware(roles ...string) gin.HandlerFunc {
	return func(c *gin.Context) {
		userRole, exists := c.Get("role")
		if !exists {
			c.JSON(http.StatusUnauthorized, model.Error("Role not found in context"))
			c.Abort()
			return
		}

		roleStr, ok := userRole.(string)
		if !ok {
			c.JSON(http.StatusForbidden, model.Error("Invalid role format"))
			c.Abort()
			return
		}

		authorized := false
		for _, r := range roles {
			if roleStr == r {
				authorized = true
				break
			}
		}

		if !authorized {
			c.JSON(http.StatusForbidden, model.Error("Akses ditolak: hak akses tidak mencukupi"))
			c.Abort()
			return
		}

		c.Next()
	}
}
