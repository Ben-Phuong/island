package service

import "go.uber.org/fx"

// Module ...
var Module = fx.Options(
	fx.Provide(NewFriendService),
	fx.Provide(NewMailService),
	fx.Provide(NewUserService),
)
