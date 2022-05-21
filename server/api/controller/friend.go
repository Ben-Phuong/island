package controller

import (
	"errors"
	"island-backend/lib"
	"island-backend/model"
	"island-backend/service"
	"island-backend/util"
	"net/http"

	"github.com/gin-gonic/gin"
)

// FriendController
type FriendController struct {
	friendService service.FriendService
	logger        lib.Logger
}

// NewFriendController
func NewFriendController(
	friendService service.FriendService,
	logger lib.Logger,
) FriendController {
	return FriendController{
		friendService: friendService,
		logger:        logger,
	}
}

// AddFriend godoc
// @Summary Create 2 new Friend docs in "friends" collection according to the ID of the 2 users involving in the relationship
// @Description Need authentication to use
// @Tag friend
// @Accept json
// @Param interaction body model.UpdateFriend true "Update Friend Model"
// @Security     ApiKeyAuth
// @Router /friend [post]
// @Success 200	{object} entity.Friend
// @Failure 400	{object} util.HTTPError
// AddFriend ...
func (c *FriendController) AddFriend(g *gin.Context) {
	interaction := model.UpdateFriend{}

	if err := g.ShouldBindJSON(&interaction); err != nil {
		util.NewError(g, http.StatusBadRequest, err, c.logger)
		return
	}

	if result, err := c.friendService.CreateFriendship(&interaction); err != nil {
		util.NewError(g, http.StatusInternalServerError, err, c.logger)
	} else {
		g.JSON(http.StatusOK, result)
	}
}

// GetAllFriends godoc
// @Summary Get Friends of a User by ID
// @Tag friend
// @Accept json
// @Param  userId query string true "User ID"
// @Router /friend [get]
// @Success 200	{array} entity.User
// @Failure 400	{object} util.HTTPError
// GetAllFriends ...
func (c *FriendController) GetAllFriends(g *gin.Context) {
	userID := g.Query("userId")
	if userID == "" {
		util.NewError(g, http.StatusBadRequest, errors.New("userId invalid"), c.logger)
		return
	}

	if result, err := c.friendService.GetAllFriends(userID); err != nil {
		util.NewError(g, http.StatusInternalServerError, err, c.logger)
	} else {
		g.JSON(http.StatusOK, result)
	}
}
