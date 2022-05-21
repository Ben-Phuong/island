package entity

import "time"

// mails | {receiverId} | {senderId} | {mailId}

type Mail struct {
	BaseEntity

	ReceiverID  string    `json:"receiverId" firestore:"-"`
	SenderID    string    `json:"senderId" firestore:"-"`
	Content     string    `json:"content" firestore:"content"`
	Images      []string  `json:"images" firestore:"images"`
	Title       string    `json:"title" firestore:"title"`
	ArrivalTime time.Time `json:"arrivalTime" firestore:"arrivalTime"`
}
