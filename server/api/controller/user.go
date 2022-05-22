package controller

import (
	"errors"
	"island-backend/entity"
	"island-backend/lib"
	"island-backend/model"
	"island-backend/service"
	"island-backend/util"
	"net/http"

	"github.com/gin-gonic/gin"
)

// UserController
type UserController struct {
	userService service.UserService
	logger      lib.Logger
}

// NewUserController
func NewUserController(
	userService service.UserService,
	logger lib.Logger,
) UserController {
	return UserController{
		userService: userService,
		logger:      logger,
	}
}

// UserSignUp godoc
// @Summary Create a new User doc in "users" collection
// @Description Need authentication to use
// @Tags user
// @Accept json
// @Param user body entity.User true "User Entity"
// @Security     ApiKeyAuth
// @Router /user [post]
// @Success 200	{object} entity.User
// @Failure 400	{object} util.HTTPError
// UserSignUp ...
func (c *UserController) UserSignUp(g *gin.Context) {
	user := entity.User{}

	if err := g.ShouldBindJSON(&user); err != nil {
		util.NewError(g, http.StatusBadRequest, err, c.logger)
		return
	} else {
	}

	if result, err := c.userService.CreateUser(&user); err != nil {
		util.NewError(g, http.StatusInternalServerError, err, c.logger)
	} else {
		g.JSON(http.StatusOK, result)
	}
}

// UpdateLocation godoc
// @Summary Update Location of the User
// @Description Need authentication to use
// @Tags user
// @Accept json
// @Param user body model.UpdateLocation true "Update Location Model"
// @Security     ApiKeyAuth
// @Router /user [put]
// @Success 200	{object} entity.User
// @Failure 400	{object} util.HTTPError
// UpdateLocation ...
func (c *UserController) UpdateLocation(g *gin.Context) {
	location := model.UpdateLocation{}

	if err := g.ShouldBindJSON(&location); err != nil {
		util.NewError(g, http.StatusBadRequest, err, c.logger)
		return
	}

	if result, err := c.userService.UpdateUserLocation(&location); err != nil {
		util.NewError(g, http.StatusInternalServerError, err, c.logger)
	} else {
		g.JSON(http.StatusOK, result)
	}
}

// GetUser godoc
// @Summary Get User by ID
// @Tags user
// @Accept json
// @Param  userId query string true "User ID"
// @Router /user [get]
// @Success 200	{object} entity.User
// @Failure 400	{object} util.HTTPError
// GetUser ...
func (c *UserController) GetUser(g *gin.Context) {
	userID := g.Query("userId")

	if userID == "" {
		util.NewError(g, http.StatusBadRequest, errors.New("userId invalid"), c.logger)
		return
	}

	if result, err := c.userService.GetUser(userID); err != nil {
		util.NewError(g, http.StatusInternalServerError, err, c.logger)
	} else {
		g.JSON(http.StatusOK, result)
	}
}
