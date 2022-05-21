package entity

import "time"

// friends | {userId} | objects | {friendId}

type Friend struct {
	BaseEntity

	UserId   string `json:"userId" firestore:"-"`
	FriendId string `json:"friendId" firestore:"-"`
	// for sorting in descendant order of last interaction time
	LastInteraction time.Time `json:"lastInteraction" firestore:"lastInteraction"`
}
