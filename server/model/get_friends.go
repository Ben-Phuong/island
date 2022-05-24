package model

import "island-backend/entity"

type GetFriends struct {
	Friends [](*entity.User) `json:"friends,omitempty"`
}

// {
// 	friends: [{
// 		id: userID,
// 		avatarUrl:
// 	}]
// }
