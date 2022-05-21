package bootstrap

import (
	"island-backend/api/controller"
	"island-backend/api/middleware"
	"island-backend/api/route"
	"island-backend/lib"
	"island-backend/repository"
	"island-backend/service"

	"go.uber.org/fx"
)

// CommonModules ...
var CommonModules = fx.Options(
	controller.Module,
	route.Module,
	lib.Module,
	service.Module,
	middleware.Module,
	repository.Module,
)
