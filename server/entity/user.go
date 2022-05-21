package entity

// users | {userUID}

// User ...
type User struct {
	BaseEntity

	AvatarURL string `json:"avatarUrl" firestore:"avatarUrl"`
	Email     string `json:"email" firestore:"email"`

	// update everytime the user logs ins
	Location map[string]float64 `json:"location" firestore:"location"`
	// unique and changable username, use for display
	Username string `json:"username" firestore:"username"`
}
