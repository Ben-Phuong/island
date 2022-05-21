package entity

import "time"

// BaseEntity Define all field common of entity
type BaseEntity struct {
	ID        string    `json:"id" firestore:"-"`
	CreatedAt time.Time `json:"-" firestore:"createdAt"`
}
