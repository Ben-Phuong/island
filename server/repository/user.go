package repository

import (
	"context"
	"island-backend/entity"
	"island-backend/lib"
	"island-backend/model"
	"log"

	"cloud.google.com/go/firestore"
	"google.golang.org/api/iterator"
)

// UserRepository struct handle integration with users collection
type UserRepository struct {
	fbase lib.FirebaseApp
}

// NewUserRepository create new instance of UserRepository
func NewUserRepository(fbase lib.FirebaseApp) UserRepository {
	return UserRepository{fbase: fbase}
}

// Create ...
func (r *UserRepository) Create(user *entity.User) (*entity.User, error) {
	ctx := context.Background()

	ref := r.fbase.FStore.Collection(userCollection).Doc(user.ID)
	if _, err := ref.Create(ctx, user); err != nil {
		log.Println("User Repository raises error: ", err)
		return nil, err
	}

	return user, nil
}

// Get ...
func (r *UserRepository) Get(userID string) (*entity.User, error) {
	ctx := context.Background()

	ref := r.fbase.FStore.Collection(userCollection).Doc(userID)
	user := entity.User{}
	if doc, err := ref.Get(ctx); err != nil {
		log.Println("User Repository raises error: ", err)
		return nil, err
	} else {
		doc.DataTo(&user)
		user.ID = ref.ID
	}

	return &user, nil
}

// GetAll ...
func (r *UserRepository) GetAll() ([](*entity.User), error) {
	ctx := context.Background()
	users := [](*entity.User){}
	iter := r.fbase.FStore.Collection(userCollection).Documents(ctx)
	for {
		doc, err := iter.Next()
		if err == iterator.Done {
			break
		}
		if err != nil {
			log.Println("User Repository raises error: ", err)
			return nil, err
		}

		user := entity.User{}
		doc.DataTo(&user)
		user.ID = doc.Ref.ID
		users = append(users, &user)
	}

	return users, nil
}

// GetMany ...
func (r *UserRepository) GetMany(userIDs []string) ([](*entity.User), error) {
	ctx := context.Background()
	users := [](*entity.User){}

	for _, userId := range userIDs {
		ref := r.fbase.FStore.Collection(userCollection).Doc(userId)
		if doc, err := ref.Get(ctx); err != nil {
			log.Println("User Repository raises error: ", err)
			return nil, err
		} else {
			user := entity.User{}
			doc.DataTo(&user)
			user.ID = doc.Ref.ID
			users = append(users, &user)
		}
	}

	return users, nil
}

// UpdateLocation
func (r *UserRepository) UpdateLocation(location *model.UpdateLocation) (*entity.User, error) {
	ctx := context.Background()
	user := entity.User{}
	ref := r.fbase.FStore.Collection(userCollection).Doc(location.UserID)

	// Check whether the userId is valid
	if doc, err := ref.Get(ctx); err != nil {
		log.Println("User Repository raises error: ", err)
		return nil, err
	} else {
		doc.DataTo(&user)
	}

	if _, err := ref.Update(ctx, []firestore.Update{
		{
			Path:  "location",
			Value: location.Location,
		},
	}); err != nil {
		log.Println("User Repository raises error: ", err)
		return nil, err
	} else {
		user.ID = location.UserID
		user.Location = location.Location
	}

	return &user, nil
}
