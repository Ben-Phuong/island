package model

type AdminResponse struct {
	Message string `json:"message" firestore:"message"`
}
