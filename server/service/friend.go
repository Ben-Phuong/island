package service

import (
	"errors"
	"island-backend/entity"
	"island-backend/model"
	"island-backend/repository"
	"log"
	"math/rand"
)

// FriendService
type FriendService struct {
	friendRepo repository.FriendRepository
	mailRepo   repository.MailRepository
	userRepo   repository.UserRepository
}

// NewFriendService
func NewFriendService(
	friendRepo repository.FriendRepository,
	userRepo repository.UserRepository,
	mailRepo repository.MailRepository,
) FriendService {
	return FriendService{
		friendRepo: friendRepo,
		userRepo:   userRepo,
		mailRepo:   mailRepo,
	}
}

// CreateFriendship
func (s *FriendService) CreateFriendship(interaction *model.UpdateFriend) (*model.UpdateFriend, error) {
	return s.friendRepo.Create(interaction)
}

// GetAllFriends
func (s *FriendService) GetAllFriends(userID string) ([]*entity.User, error) {
	friends := []*entity.User{}
	friendIDs := []string{}

	// Get all the friendship userID has
	if friendships, err := s.friendRepo.GetAll(userID); err != nil {
		log.Println("Friend Service raises error: ", err)
		return nil, err
	} else {
		for _, friendship := range friendships {
			// Get the User with the FriendID
			if friend, err := s.userRepo.Get(friendship.FriendId); err != nil {
				log.Println("Friend Service raises error: ", err)
				return nil, err
			} else {
				friends = append(friends, friend)
				friendIDs = append(friendIDs, friend.ID)
			}
		}
	}

	getMail := model.GetReceivedMail{ToID: userID, FromIDs: friendIDs}
	if mails, err := s.mailRepo.GetReceived(&getMail); err != nil {
		return nil, err
	} else {
		for _, friend := range friends {
			friend.LastMailTitle = mails.ReceivedMails[friend.ID][0].Title
		}
	}

	return friends, nil
}

// GetAllStrangers
func (s *FriendService) GetAllStrangers(userID string) ([]*entity.User, error) {
	friendMap := map[string]*entity.User{}

	// Get all the friends that userID has
	if friends, err := s.GetAllFriends(userID); err != nil {
		log.Println("Friend Service raises error: ", err)
		return nil, err
	} else {
		// Map it to friendMap with key being friend.ID and value being friend for easier searching
		for _, friend := range friends {
			friendMap[friend.ID] = friend
		}
	}

	strangers := []*entity.User{}

	// Get all users
	if users, err := s.userRepo.GetAll(); err != nil {
		log.Println("Friend Service raises error: ", err)
		return nil, err
	} else {
		// Loop through all users
		for _, user := range users {
			// If user is not existing in the friendMap, then add to strangers array
			if _, ok := friendMap[user.ID]; !ok {
				strangers = append(strangers, user)
			}
		}
	}

	return strangers, nil
}

// GetRandomStranger ...
func (s *FriendService) GetRandomStranger(userID string) (*entity.User, error) {
	strangers, err := s.GetAllStrangers(userID)
	if err != nil {
		log.Println("Friend Service raises error: ", err)
		return nil, err
	}

	n := len(strangers)
	if n == 0 {
		return nil, errors.New("no more strangers left")
	}

	randInt := rand.Intn(n)
	return strangers[randInt], nil
}
