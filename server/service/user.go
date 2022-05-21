package service

import (
	"errors"
	"island-backend/entity"
	"island-backend/model"
	"island-backend/repository"
	"log"
	"time"
)

// UserService ...
type UserService struct {
	userRepo repository.UserRepository
}

// NewUserService
func NewUserService(userRepo repository.UserRepository) UserService {
	return UserService{userRepo: userRepo}
}

// validate
func (s *UserService) validate(user *entity.User) error {
	if user.ID == "" {
		return errors.New("id should not be empty")
	}
	if user.Email == "" {
		return errors.New("email should not be empty")
	}
	if user.Username == "" {
		return errors.New("username should not be empty")
	}
	return nil
}

// CreateUser
func (s *UserService) CreateUser(user *entity.User) (*entity.User, error) {
	if err := s.validate(user); err != nil {
		log.Println("User Service raises error: ", err)
		return nil, err
	}

	if existingUsers, err := s.GetAllUsers(); err != nil {
		return nil, err
	} else {
		for _, existingUser := range existingUsers {
			if user.Username == existingUser.Username {
				return nil, errors.New("invalid username")
			}
		}
	}

	user.CreatedAt = time.Now()

	return s.userRepo.Create(user)
}

// GetUser ...
func (s *UserService) GetUser(userID string) (*entity.User, error) {
	return s.userRepo.Get(userID)
}

// GetAllUsers ...
func (s *UserService) GetAllUsers() ([](*entity.User), error) {
	return s.userRepo.GetAll()
}

// UpdateUserLocation ...
func (s *UserService) UpdateUserLocation(location *model.UpdateLocation) (*entity.User, error) {
	return s.userRepo.UpdateLocation(location)
}
