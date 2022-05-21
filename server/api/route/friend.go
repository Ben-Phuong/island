package route

import (
	"island-backend/api/controller"
	"island-backend/api/middleware"
	"island-backend/lib"
)

// FriendRoutes struct
type FriendRoutes struct {
	logger         lib.Logger
	handler        lib.RequestHandler
	controller     controller.FriendController
	authMiddleware middleware.JWTFirebaseAuthMiddleware
}

// NewFriendRoutes creates new Friend controller
func NewFriendRoutes(
	logger lib.Logger,
	handler lib.RequestHandler,
	controller controller.FriendController,
	authMiddleware middleware.JWTFirebaseAuthMiddleware,
) FriendRoutes {
	return FriendRoutes{
		logger:         logger,
		handler:        handler,
		controller:     controller,
		authMiddleware: authMiddleware,
	}
}

// Setup Friend routes
func (r *FriendRoutes) Setup() {
	r.logger.Info("Setting Friend Routes")

	apiAuth := r.handler.Gin.Group("/api").Use(r.authMiddleware.HandlerCheckAuth())
	api := r.handler.Gin.Group("/api")

	apiAuth.POST("/friend", r.controller.AddFriend)
	api.GET("/friend", r.controller.GetAllFriends)
}
