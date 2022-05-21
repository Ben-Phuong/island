package middleware

import (
	"errors"
	"island-backend/lib"
	"island-backend/util"
	"net/http"
	"strings"

	"github.com/gin-gonic/gin"
)

// JWTFirebaseAuthMiddleware ...
type JWTFirebaseAuthMiddleware struct {
	fbase  lib.FirebaseApp
	logger lib.Logger
}

// NewJWTFirebaseAuthMiddleware ...
func NewJWTFirebaseAuthMiddleware(fbase lib.FirebaseApp, logger lib.Logger) JWTFirebaseAuthMiddleware {
	return JWTFirebaseAuthMiddleware{
		fbase:  fbase,
		logger: logger,
	}
}

// Setup sets up jwt auth middleware
func (m JWTFirebaseAuthMiddleware) Setup() {}

// HandlerCheckAuth handles middleware functionality check tokenId valid
func (m JWTFirebaseAuthMiddleware) HandlerCheckAuth() gin.HandlerFunc {
	return func(c *gin.Context) {
		authHeader := c.Request.Header.Get("Authorization")
		t := strings.Split(authHeader, " ")
		if len(t) == 2 {
			authToken := t[1]
			_, err := m.fbase.Auth.VerifyIDToken(c, authToken)

			if err == nil {
				c.Next()
				return
			}
			util.NewError(c, http.StatusInternalServerError, err, m.logger)
			c.Abort()
			return
		}
		util.NewError(c, http.StatusUnauthorized, errors.New("unauthorized"), m.logger)
		c.Abort()
	}
}

// HandlerCheckAdmin handles middleware functionality check tokenId valid
func (m JWTFirebaseAuthMiddleware) HandlerCheckAdmin() gin.HandlerFunc {
	return func(c *gin.Context) {
		authHeader := c.Request.Header.Get("Authorization")
		t := strings.Split(authHeader, " ")
		if len(t) == 2 {
			authToken := t[1]

			token, err := m.fbase.Auth.VerifyIDToken(c, authToken)

			if err != nil {
				util.NewError(c, http.StatusInternalServerError, err, m.logger)
				c.Abort()
				return
			}

			doc, err := m.fbase.FStore.Collection("admins").Doc(token.UID).Get(c)
			if !doc.Exists() || err != nil {
				util.NewError(c, http.StatusInternalServerError, err, m.logger)
				c.Abort()
				return
			}

			if err == nil {
				c.Next()
				return
			}
		}
		util.NewError(c, http.StatusUnauthorized, errors.New("unauthorized"), m.logger)
		c.Abort()
	}
}
