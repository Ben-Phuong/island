package main

import (
	"island-backend/bootstrap"

	"github.com/joho/godotenv"
)

func main() {
	_ = godotenv.Load()
	bootstrap.RootApp.Execute()
}
