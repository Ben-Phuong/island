package route

import (
	"go.uber.org/fx"
)

// Module ...
var Module = fx.Options(
	fx.Provide(NewFriendRoutes),
	fx.Provide(NewMailRoutes),
	fx.Provide(NewUserRoutes),
	fx.Provide(NewRoutes),
)

// Routes contains multiple routes
type Routes []Route

// Route interface
type Route interface {
	Setup()
}

// NewRoutes sets up routes
func NewRoutes(
	friendRoutes FriendRoutes,
	mailRoutes MailRoutes,
	userRoutes UserRoutes,
) Routes {
	return Routes{
		&friendRoutes,
		&mailRoutes,
		&userRoutes,
	}
}

// Setup all the route
func (r Routes) Setup() {
	for _, route := range r {
		route.Setup()
	}
}
