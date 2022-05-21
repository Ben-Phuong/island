package route

import (
	"island-backend/api/controller"
	"island-backend/api/middleware"
	"island-backend/lib"
)

// MailRoutes struct
type MailRoutes struct {
	logger         lib.Logger
	handler        lib.RequestHandler
	controller     controller.MailController
	authMiddleware middleware.JWTFirebaseAuthMiddleware
}

// NewMailRoutes creates new Mail controller
func NewMailRoutes(
	logger lib.Logger,
	handler lib.RequestHandler,
	controller controller.MailController,
	authMiddleware middleware.JWTFirebaseAuthMiddleware,
) MailRoutes {
	return MailRoutes{
		logger:         logger,
		handler:        handler,
		controller:     controller,
		authMiddleware: authMiddleware,
	}
}

// Setup Mail routes
func (r *MailRoutes) Setup() {
	r.logger.Info("Setting Mail Routes")

	apiAuth := r.handler.Gin.Group("/api").Use(r.authMiddleware.HandlerCheckAuth())
	api := r.handler.Gin.Group("/api")

	apiAuth.POST("/random_mail", r.controller.SendRandomMail)
	apiAuth.POST("/mail", r.controller.SendMail)

	api.GET("/sent_mails", r.controller.GetSentToFriendMails)
	api.GET("/received_mails", r.controller.GetReceivedFromFriendMails)
	api.GET("/unread_mails", r.controller.GetReceivedFromStrangerMails)
	// apiAuth.POST("/Mail", r.controller.AddMail)
	// api.GET("/Mail", r.controller.GetAllMails)
}
