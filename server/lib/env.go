package lib

import (
	"log"

	"github.com/spf13/viper"
)

// Env has enviroment stored
type Env struct {
	ServerPort  string `mapstructure:"SERVER_PORT"`
	Environment string `mapstructure:"ENV"`
	LogOutput   string `mapstructure:"LOG_OUTPUT"`
	LogLevel    string `mapstructure:"LOG_LEVEL"`

	ProjectID  string `mapstructure:"PROJECT_ID"`
	BackendURL string `mapstructure:"BACKEND_URL"`
	Schemes    string `mapstructure:"SHEMES"`
}

// NewEnv creates a new eviroment
func NewEnv() Env {
	env := Env{}
	viper.SetConfigFile(".env")
	if err := viper.ReadInConfig(); err != nil {
		log.Fatal("☠️ cannot read configuration: ", err)
	}

	if err := viper.Unmarshal(&env); err != nil {
		log.Fatal("☠️ environment can't be loaded: ", err)
	}

	return env

}
