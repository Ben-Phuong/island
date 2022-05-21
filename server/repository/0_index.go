package repository

import "go.uber.org/fx"

// Collection names
const (
	postCollection       = "posts"
	userCollection       = "users"
	friendCollection     = "friends"
	mailCollection       = "mails"
	defaultSubcollection = "objects"
)

// Module ...
var Module = fx.Options(
	fx.Provide(NewUserRepository),
	fx.Provide(NewFriendRepository),
	fx.Provide(NewMailRepository),
)
