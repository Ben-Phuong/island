package model

import "island-backend/entity"

type GetSentMail struct {
	FromID string   `json:"fromId"`
	ToIDs  []string `json:"toIds"`
}

type GetSentMailResponse struct {
	FromID    string                    `json:"fromId"`
	SentMails map[string][]*entity.Mail `json:"sentMails"`
}

type GetReceivedMail struct {
	ToID    string   `json:"toId"`
	FromIDs []string `json:"fromIds"`
}

type GetReceivedMailResponse struct {
	ToID          string                    `json:"toId"`
	ReceivedMails map[string][]*entity.Mail `json:"receivedMails"`
}
