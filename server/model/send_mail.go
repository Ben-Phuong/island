package model

type SendRandomMail struct {
	SenderID string   `json:"senderId"`
	Content  string   `json:"content"`
	Images   []string `json:"images"`
	Title    string   `json:"title"`
}

type SendMail struct {
	SenderID   string   `json:"senderId"`
	Content    string   `json:"content"`
	Images     []string `json:"images"`
	Title      string   `json:"title"`
	ReceiverID string   `json:"receiverId"`
}
