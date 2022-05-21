package entity

// posts | {postId}

// Post ...
type Post struct {
	BaseEntity

	Description string             `json:"description" firestore:"description"`
	Email       string             `json:"email" firestore:"email"`
	Images      []string           `json:"images" firestore:"images"`
	Location    map[string]float64 `json:"location" firestore:"location"`

	// -2: posted, waiting in queue
	// -1: posted, declined
	// 0: posted, approved
	// 1: found
	Status       int8   `json:"status" firestore:"status"`
	AdminMessage string `json:"adminMessage" firestore:"adminMessage"`
}
