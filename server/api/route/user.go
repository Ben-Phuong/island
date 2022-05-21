package route

import (
	"island-backend/api/controller"
	"island-backend/api/middleware"
	"island-backend/lib"
)

// UserRoutes struct
type UserRoutes struct {
	logger         lib.Logger
	handler        lib.RequestHandler
	controller     controller.UserController
	authMiddleware middleware.JWTFirebaseAuthMiddleware
}

// NewUserRoutes creates new User controller
func NewUserRoutes(
	logger lib.Logger,
	handler lib.RequestHandler,
	controller controller.UserController,
	authMiddleware middleware.JWTFirebaseAuthMiddleware,
) UserRoutes {
	return UserRoutes{
		logger:         logger,
		handler:        handler,
		controller:     controller,
		authMiddleware: authMiddleware,
	}
}

// Setup User routes
func (r *UserRoutes) Setup() {
	r.logger.Info("Setting User Routes")

	apiAuth := r.handler.Gin.Group("/api").Use(r.authMiddleware.HandlerCheckAuth())
	api := r.handler.Gin.Group("/api")

	apiAuth.POST("/user", r.controller.UserSignUp)
	apiAuth.PUT("user", r.controller.UpdateLocation)
	api.GET("/user", r.controller.GetUser)
}
