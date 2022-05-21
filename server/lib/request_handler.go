package lib

import (
	"fmt"
	"island-backend/docs"

	"github.com/gin-gonic/gin"
	swaggerfiles "github.com/swaggo/files"
	ginSwagger "github.com/swaggo/gin-swagger"
)

// RequestHandler function
type RequestHandler struct {
	Gin *gin.Engine
}

// NewRequestHandler creates a new request handler
func NewRequestHandler(logger Logger, env Env) RequestHandler {
	gin.DefaultWriter = logger.GetGinLogger()
	engine := gin.New()
	setupSwaggerDoc(env)
	engine.GET("/", func(ctx *gin.Context) {
		fmt.Fprintln(ctx.Writer, "Server is running...")
	})
	engine.GET("/swagger/*any", ginSwagger.WrapHandler(swaggerfiles.Handler))
	return RequestHandler{Gin: engine}
}

func setupSwaggerDoc(env Env) {

	docs.SwaggerInfo.Title = "Raramuri Backend API"
	docs.SwaggerInfo.Version = "1.0"
	docs.SwaggerInfo.Description = "This is api of raramuri backend"

	docs.SwaggerInfo.Host = env.BackendURL
	docs.SwaggerInfo.BasePath = "/api"
	docs.SwaggerInfo.Schemes = []string{env.Schemes}
}
