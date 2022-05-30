package repository

import (
	"context"
	"errors"
	"island-backend/entity"
	"island-backend/lib"
	"island-backend/model"
	"log"
	"sort"
	"strings"
	"time"

	"cloud.google.com/go/firestore"
	"google.golang.org/api/iterator"
)

// FriendRepository struct handle integration with friends collection
type FriendRepository struct {
	fbase lib.FirebaseApp
}

// NewFriendRepository create new instance of FriendRepository
func NewFriendRepository(fbase lib.FirebaseApp) FriendRepository {
	return FriendRepository{fbase: fbase}
}

// Create ...
func (r *FriendRepository) Create(interaction *model.UpdateFriend) (*model.UpdateFriend, error) {
	ctx := context.Background()

	err := r.fbase.FStore.RunTransaction(ctx, func(ctx context.Context, tx *firestore.Transaction) error {
		ref1 := r.fbase.FStore.Collection(userCollection).Doc(interaction.UserID1)
		ref2 := r.fbase.FStore.Collection(userCollection).Doc(interaction.UserID2)

		// Check if the 2 users are valid
		if _, err := tx.Get(ref1); err != nil {
			return err
		}
		if _, err := tx.Get(ref2); err != nil {
			return err
		}

		ref1 = r.fbase.FStore.Collection(friendCollection).Doc(interaction.UserID1).Collection(defaultSubcollection).Doc(interaction.UserID2)
		ref2 = r.fbase.FStore.Collection(friendCollection).Doc(interaction.UserID2).Collection(defaultSubcollection).Doc(interaction.UserID1)

		// Check if the friendship is already existed
		if _, err := tx.Get(ref1); err == nil {
			return errors.New("the friendship is already existed")
		}

		friendship := entity.Friend{}
		friendship.LastInteraction = interaction.InteractionTime
		friendship.CreatedAt = time.Now()

		// Create Friend for User 1
		friendship.UserId = interaction.UserID1
		friendship.FriendId = interaction.UserID2
		if err := tx.Create(ref1, friendship); err != nil {
			return err
		}

		// Create Friend for User 2
		friendship.UserId = interaction.UserID2
		friendship.FriendId = interaction.UserID1
		return tx.Create(ref2, friendship)

	})

	if err != nil {
		log.Println("Friend Repository raises error: ", err)

		return nil, err
	}

	return interaction, err
}

// UpdateInteraction ...
func (r *FriendRepository) UpdateInteraction(interaction *model.UpdateFriend) (*model.UpdateFriend, error) {
	ctx := context.Background()

	err := r.fbase.FStore.RunTransaction(ctx, func(ctx context.Context, tx *firestore.Transaction) error {
		ref1 := r.fbase.FStore.Collection(friendCollection).Doc(interaction.UserID1).Collection(defaultSubcollection).Doc(interaction.UserID2)
		ref2 := r.fbase.FStore.Collection(friendCollection).Doc(interaction.UserID2).Collection(defaultSubcollection).Doc(interaction.UserID1)
		log.Println("REF: ", ref1, ref2)

		// Check if the friendship is already existed
		if _, err := tx.Get(ref1); err != nil {
			return err
		}

		friendship := entity.Friend{}
		friendship.LastInteraction = interaction.InteractionTime

		// Update for User 1
		if err := tx.Update(ref1, []firestore.Update{
			{
				Path:  "lastInteraction",
				Value: interaction.InteractionTime,
			},
		}); err != nil {
			return err
		}

		// Update for User 2
		return tx.Update(ref2, []firestore.Update{
			{
				Path:  "lastInteraction",
				Value: interaction.InteractionTime,
			},
		})

	})

	if err != nil {
		log.Println("Friend Repository raises error: ", err)

		return nil, err
	}

	return interaction, err
}

// GetAll ...
func (r *FriendRepository) GetAll(userId string) ([]*entity.Friend, error) {
	ctx := context.Background()
	friends := [](*entity.Friend){}

	iter := r.fbase.FStore.Collection(friendCollection).Doc(userId).Collection(defaultSubcollection).Documents(ctx)
	for {
		doc, err := iter.Next()
		if err == iterator.Done {
			break
		}
		if err != nil {
			log.Println("Friend Repository raises error: ", err)
			return nil, err
		}
		friend := entity.Friend{}
		doc.DataTo(&friend)
		paths := strings.Split(doc.Ref.Path, "/")
		// friends | {userId} | objects | {friendId}
		n := len(paths)
		friend.UserId = paths[n-3]
		friend.FriendId = paths[n-1]
		friends = append(friends, &friend)
	}

	if len(friends) != 0 {
		sort.Slice(friends, func(i, j int) bool {
			return friends[i].LastInteraction.After(friends[j].LastInteraction)
		})
	}
	return friends, nil
}
