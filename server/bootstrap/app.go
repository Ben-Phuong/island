package bootstrap

import (
	"island-backend/command"

	"github.com/spf13/cobra"
)

var rootCmd = &cobra.Command{
	Use:              "server",
	Short:            "_______Island Backend API____________",
	Long:             "_______Island Backend API____________",
	TraverseChildren: true,
}

// App root of application
type App struct {
	*cobra.Command
}

// NewApp ...
func NewApp() App {

	cmd := App{
		Command: rootCmd,
	}
	cmd.AddCommand(command.GetSubCommands(CommonModules)...)

	return cmd
}

// RootApp ...
var RootApp = NewApp()
