package util

import (
	"island-backend/lib"

	"github.com/gin-gonic/gin"
)

// NewError example
func NewError(ctx *gin.Context, status int, err error, logger lib.Logger) {
	logger.Error(err)

	er := HTTPError{
		Code:    status,
		Message: err.Error(),
	}

	ctx.JSON(status, er)
}

// HTTPError example
type HTTPError struct {
	Code    int    `json:"code" example:"400"`
	Message string `json:"message" example:"status bad request"`
}
