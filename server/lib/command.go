package lib

import "github.com/spf13/cobra"

// CommandRunner ...
type CommandRunner interface{}

// Command interface is used to implement sub-command in the system.
type Command interface {
	// Short returns string about short description of the command
	// the string is shown in help screen of cobra command
	Short() string

	// Setup is used to setup flags or pre-run steps for command.
	// For example
	// cmd.Flags().IntVarP(&r.num, "num", "n", 5, "description")
	Setup(cmd *cobra.Command)

	// Run runs the command runner
	// run returns command runner which is a function with dependencys
	// injected arguments.
	//
	// For example,
	//  Command{
	//   Run: func(l lib.Logger) {
	// 	   l.Info("i am working")
	// 	 },
	//  }
	//
	Run() CommandRunner
}
