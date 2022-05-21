package model

type UpdateLocation struct {
	UserID   string             `json:"userId"`
	Location map[string]float64 `json:"location"`
}
