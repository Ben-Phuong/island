package model

import "time"

type UpdateFriend struct {
	UserID1         string    `json:"userId1"`
	UserID2         string    `json:"userId2"`
	InteractionTime time.Time `json:"interactionTime"`
}
