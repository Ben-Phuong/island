package lib

import (
	"context"

	"cloud.google.com/go/firestore"
	firebase "firebase.google.com/go"
	"firebase.google.com/go/auth"
)

// FirebaseApp ...
type FirebaseApp struct {
	FStore *firestore.Client
	Auth   *auth.Client
}

// NewFirebaseClient creates a new firestore instance
func NewFirebaseClient(_ Env, logger Logger) FirebaseApp {
	ctx := context.Background()
	app, err := firebase.NewApp(context.Background(), nil)
	if err != nil {
		logger.Panic("Init firebase App error: ", err)
	}

	fStore, err := app.Firestore(ctx)
	if err != nil {
		logger.Panic("Init firestore client error: ", err)
	}

	auth, err := app.Auth(ctx)

	if err != nil {
		logger.Panic("Init auth client error: ", err)
	}

	return FirebaseApp{
		FStore: fStore,
		Auth:   auth,
	}

}
