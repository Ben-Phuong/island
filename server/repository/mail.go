package repository

import (
	"context"
	"island-backend/entity"
	"island-backend/lib"
	"island-backend/model"
	"log"
	"sort"
	"strings"
	"time"

	"google.golang.org/api/iterator"
)

// MailRepository ...
type MailRepository struct {
	fbase lib.FirebaseApp
}

// NewMailRepository
func NewMailRepository(fbase lib.FirebaseApp) MailRepository {
	return MailRepository{fbase: fbase}
}

// validate ...
func (r *MailRepository) validate(mail *entity.Mail) error {
	ctx := context.Background()

	ref := r.fbase.FStore.Collection(userCollection).Doc(mail.SenderID)
	if _, err := ref.Get(ctx); err != nil {
		return err
	}

	ref = r.fbase.FStore.Collection(userCollection).Doc(mail.ReceiverID)
	if _, err := ref.Get(ctx); err != nil {
		return err
	}

	return nil
}

// Create ...
func (r *MailRepository) Create(mail *entity.Mail) (*entity.Mail, error) {
	ctx := context.Background()

	if err := r.validate(mail); err != nil {
		return nil, err
	}

	ref := r.fbase.FStore.Collection(mailCollection).Doc(mail.ReceiverID).Collection(mail.SenderID).NewDoc()
	mail.ID = ref.ID

	if _, err := ref.Create(ctx, mail); err != nil {
		return nil, err
	}

	return mail, nil
}

// CreateMany ...
func (r *MailRepository) CreateMany(mails *[]*entity.Mail) (*[]*entity.Mail, error) {
	ctx := context.Background()

	batch := r.fbase.FStore.Batch()

	for _, mail := range *mails {
		if err := r.validate(mail); err != nil {
			return nil, err
		}
		ref := r.fbase.FStore.Collection(mailCollection).Doc(mail.ReceiverID).Collection(mail.SenderID).NewDoc()
		mail.ID = ref.ID
		batch.Set(ref, mail)
	}

	if _, err := batch.Commit(ctx); err != nil {
		return nil, err
	}

	return mails, nil
}

// GetSent ...
func (r *MailRepository) GetSent(request *model.GetSentMail) (*model.GetSentMailResponse, error) {
	ctx := context.Background()

	response := model.GetSentMailResponse{}
	response.FromID = request.FromID
	for _, toID := range request.ToIDs {
		response.SentMails[toID] = []*entity.Mail{}
		iter := r.fbase.FStore.Collection(mailCollection).Doc(toID).Collection(request.FromID).Documents(ctx)
		for {
			doc, err := iter.Next()
			if err == iterator.Done {
				break
			}
			if err != nil {
				log.Println("Mail Repository raises error: ", err)
				return nil, err
			}

			mail := entity.Mail{}
			doc.DataTo(&mail)
			// mails | {receiverId} | {senderId} | {mailId}
			paths := strings.Split(doc.Ref.Path, "/")
			n := len(paths)
			mail.ID = paths[n-1]
			mail.SenderID = paths[n-2]
			mail.ReceiverID = paths[n-3]
			response.SentMails[toID] = append(response.SentMails[toID], &mail)
		}

		if len(response.SentMails[toID]) == 0 {
			delete(response.SentMails, toID)
		} else {
			sort.Slice(response.SentMails[toID], func(i, j int) bool {
				return response.SentMails[toID][i].CreatedAt.After(response.SentMails[toID][j].CreatedAt)
			})
		}
	}

	return &response, nil
}

// GetReceived ...
func (r *MailRepository) GetReceived(request *model.GetReceivedMail) (*model.GetReceivedMailResponse, error) {
	ctx := context.Background()

	response := model.GetReceivedMailResponse{}
	response.ToID = request.ToID
	for _, fromID := range request.FromIDs {
		response.ReceivedMails[fromID] = []*entity.Mail{}
		iter := r.fbase.FStore.Collection(mailCollection).Doc(request.ToID).Collection(fromID).Documents(ctx)
		for {
			doc, err := iter.Next()
			if err == iterator.Done {
				break
			}
			if err != nil {
				log.Println("Mail Repository raises error: ", err)
				return nil, err
			}

			mail := entity.Mail{}
			doc.DataTo(&mail)

			// If not arrived, pass.
			if mail.ArrivalTime.After(time.Now()) {
				continue
			}

			// mails | {receiverId} | {senderId} | {mailId}
			paths := strings.Split(doc.Ref.Path, "/")
			n := len(paths)
			mail.ID = paths[n-1]
			mail.SenderID = paths[n-2]
			mail.ReceiverID = paths[n-3]
			response.ReceivedMails[fromID] = append(response.ReceivedMails[fromID], &mail)
		}

		if len(response.ReceivedMails[fromID]) == 0 {
			delete(response.ReceivedMails, fromID)
		} else {
			sort.Slice(response.ReceivedMails[fromID], func(i, j int) bool {
				return response.ReceivedMails[fromID][i].ArrivalTime.After(response.ReceivedMails[fromID][j].ArrivalTime)
			})
		}
	}

	return &response, nil
}
