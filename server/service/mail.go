package service

import (
	"island-backend/constant"
	"island-backend/entity"
	"island-backend/model"
	"island-backend/repository"
	"log"
	"time"
)

// MailService
type MailService struct {
	mailRepo   repository.MailRepository
	friendRepo repository.FriendRepository
	userRepo   repository.UserRepository
}

// NewMailService
func NewMailService(
	mailRepo repository.MailRepository,
	friendRepo repository.FriendRepository,
	userRepo repository.UserRepository,
) MailService {
	return MailService{
		mailRepo:   mailRepo,
		friendRepo: friendRepo,
		userRepo:   userRepo,
	}
}

func (s *MailService) SendMail(mail *entity.Mail) (*entity.Mail, error) {
	mail.CreatedAt = time.Now()

	sendLocation := map[string]float64{}
	receiveLocation := map[string]float64{}

	if sendUser, err := s.userRepo.Get(mail.SenderID); err != nil {
		log.Println("Mail Service raises error: ", err)
		return nil, err
	} else {
		sendLocation = sendUser.Location
	}

	if receiveUser, err := s.userRepo.Get(mail.ReceiverID); err != nil {
		log.Println("Mail Service raises error: ", err)
		return nil, err
	} else {
		receiveLocation = receiveUser.Location
	}

	log.Println("Send Location: ", sendLocation)
	log.Println("Receive Location: ", receiveLocation)

	distance := (sendLocation["latitude"] - receiveLocation["latitude"]) * (sendLocation["latitude"] - receiveLocation["latitude"])
	distance += (sendLocation["longitude"] - receiveLocation["longitude"]) * (sendLocation["longitude"] - receiveLocation["longitude"])
	arrivalTime := int64(constant.MaxArrivalSecond * distance / constant.MaxDistance)
	mail.ArrivalTime = time.Unix(arrivalTime+time.Now().Unix(), 0)

	log.Println("Distance: ", distance)
	log.Println("Arrival Time: ", arrivalTime)

	return s.mailRepo.Create(mail)
}

func (s *MailService) GetSent(request *model.GetSentMail) (*model.GetSentMailResponse, error) {
	return s.mailRepo.GetSent(request)
}

func (s *MailService) GetReceived(request *model.GetReceivedMail) (*model.GetReceivedMailResponse, error) {
	return s.mailRepo.GetReceived(request)
}
