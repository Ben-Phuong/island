package route

import (
	"go.uber.org/fx"
)

// Module ...
var Module = fx.Options(
	// fx.Provide(NewEventRoutes),
	// fx.Provide(NewItemRoutes),
	// fx.Provide(NewQuestRoutes),
	// fx.Provide(NewRewardRoutes),
	// fx.Provide(NewRunnerRoutes),
	// fx.Provide(NewViewerRoutes),
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
	// eventRoutes EventRoutes,
	// itemRoutes ItemRoutes,
	// questRoutes QuestRoutes,
	// rewardRoutes RewardRoutes,
	// runnerRoutes RunnerRoutes,
	// viewerRoutes ViewerRoutes,

) Routes {
	return Routes{
		// &eventRoutes,
		// &itemRoutes,
		// &questRoutes,
		// &rewardRoutes,
		// &runnerRoutes,
		// &viewerRoutes,
	}
}

// Setup all the route
func (r Routes) Setup() {
	for _, route := range r {
		route.Setup()
	}
}
