package middleware

import (
	"log"
	"time"

	"github.com/gin-gonic/gin"
)

// LoggerMiddleware logs requests and ideally writes to activity_logs
func LoggerMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		startTime := time.Now()
		c.Next()
		duration := time.Since(startTime)

		status := c.Writer.Status()
		method := c.Request.Method
		path := c.Request.URL.Path
		ip := c.ClientIP()

		log.Printf("[LOG] %s - [%s] \"%s %s\" %d %v", ip, startTime.Format(time.RFC3339), method, path, status, duration)
		
		// Here you would typically also async query to save to activity_logs table
		// if c.Get("userID") != nil
	}
}
