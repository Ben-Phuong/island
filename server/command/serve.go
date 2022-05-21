package command

import (
	"island-backend/api/middleware"
	"island-backend/api/route"
	"island-backend/lib"

	"github.com/spf13/cobra"
)

// ServeCommand ...
type ServeCommand struct{}

// Short ...
func (s *ServeCommand) Short() string {
	return "serve application"
}

// Setup ...
func (s *ServeCommand) Setup(_ *cobra.Command) {}

// Run ...
func (s *ServeCommand) Run() lib.CommandRunner {
	return func(
		middlerwares middleware.Middlewares,
		env lib.Env,
		router lib.RequestHandler,
		route route.Routes,
		logger lib.Logger,
		firebaseClient lib.FirebaseApp,
	) {
		middlerwares.Setup()
		route.Setup()

		logger.Info("Running server")
		if env.ServerPort == "" {
			_ = router.Gin.Run()
		} else {
			_ = router.Gin.Run(":" + env.ServerPort)
		}
	}
}

// NewServeCommand ...
func NewServeCommand() *ServeCommand {
	return &ServeCommand{}
}
