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

// MailController ...
type MailController struct {
	userService   service.UserService
	friendService service.FriendService
	mailService   service.MailService
	logger        lib.Logger
}

// NewMailController
func NewMailController(
	userService service.UserService,
	friendService service.FriendService,
	mailService service.MailService,
	logger lib.Logger,
) MailController {
	return MailController{
		userService:   userService,
		friendService: friendService,
		mailService:   mailService,
		logger:        logger,
	}
}

// SendRandomMail godoc
// @Summary Send Mail to a random User.
// @Description Need authentication to use
// @Tags mail
// @Accept json
// @Param mail body model.SendRandomMail true "Send Random Mail Model"
// @Security     ApiKeyAuth
// @Router /random_mail [post]
// @Success 200	{object} entity.Mail
// @Failure 400	{object} util.HTTPError
// SendRandomMail ...
func (c *MailController) SendRandomMail(g *gin.Context) {
	mail := entity.Mail{}
	if err := g.ShouldBindJSON(&mail); err != nil {
		util.NewError(g, http.StatusBadRequest, err, c.logger)
		return
	}

	if user, err := c.friendService.GetRandomStranger(mail.SenderID); err != nil {
		util.NewError(g, http.StatusInternalServerError, err, c.logger)
	} else {
		mail.ReceiverID = user.ID
	}

	if result, err := c.mailService.SendMail(&mail); err != nil {
		util.NewError(g, http.StatusInternalServerError, err, c.logger)
	} else {
		g.JSON(http.StatusOK, result)
	}
}

// SendMail godoc
// @Summary Send Mail to a User.
// @Description Need authentication to use
// @Tags mail
// @Accept json
// @Param mail body model.SendMail true "Send Mail Model"
// @Security     ApiKeyAuth
// @Router /mail [post]
// @Success 200	{object} entity.Mail
// @Failure 400	{object} util.HTTPError
// SendMail ...
func (c *MailController) SendMail(g *gin.Context) {
	mail := entity.Mail{}
	if err := g.ShouldBindJSON(&mail); err != nil {
		util.NewError(g, http.StatusBadRequest, err, c.logger)
		return
	}

	if result, err := c.mailService.SendMail(&mail); err != nil {
		util.NewError(g, http.StatusInternalServerError, err, c.logger)
	} else {
		g.JSON(http.StatusOK, result)
	}
}

// GetSentToFriendMails godoc
// @Summary Get all Sent Mails from a User to their friends by ID
// @Tags mail
// @Accept json
// @Param  userId query string true "User ID"
// @Router /sent_mails [get]
// @Success 200	{object} model.GetSentMailResponse
// @Failure 400	{object} util.HTTPError
// GetSentToFriendMails ...
func (c *MailController) GetSentToFriendMails(g *gin.Context) {
	userID := g.Query("userId")

	if userID == "" {
		util.NewError(g, http.StatusBadRequest, errors.New("userId invalid"), c.logger)
		return
	}

	request := model.GetSentMail{}
	request.FromID = userID

	if friends, err := c.friendService.GetAllFriends(userID); err != nil {
		util.NewError(g, http.StatusInternalServerError, err, c.logger)
		return
	} else {
		for _, friend := range friends {
			request.ToIDs = append(request.ToIDs, friend.ID)
		}
	}

	if result, err := c.mailService.GetSent(&request); err != nil {
		util.NewError(g, http.StatusInternalServerError, err, c.logger)
	} else {
		g.JSON(http.StatusOK, result)
	}
}

// GetReceivedFromFriendMails godoc
// @Summary Get all Mails that a User has Received from their friends by ID
// @Tags mail
// @Accept json
// @Param  userId query string true "User ID"
// @Router /received_mails [get]
// @Success 200	{object} model.GetReceivedMailResponse
// @Failure 400	{object} util.HTTPError
// GetReceivedFromFriendMails ...
func (c *MailController) GetReceivedFromFriendMails(g *gin.Context) {
	userID := g.Query("userId")

	if userID == "" {
		util.NewError(g, http.StatusBadRequest, errors.New("userId invalid"), c.logger)
		return
	}
	request := model.GetReceivedMail{}
	request.ToID = userID

	if friends, err := c.friendService.GetAllFriends(userID); err != nil {
		util.NewError(g, http.StatusInternalServerError, err, c.logger)
		return
	} else {
		for _, friend := range friends {
			request.FromIDs = append(request.FromIDs, friend.ID)
		}
	}

	if result, err := c.mailService.GetReceived(&request); err != nil {
		util.NewError(g, http.StatusInternalServerError, err, c.logger)
	} else {
		g.JSON(http.StatusOK, result)
	}
}

// GetReceivedFromStrangerMails godoc
// @Summary Get all Mails that a User has Received from strangers by ID
// @Tags mail
// @Accept json
// @Param  userId query string true "User ID"
// @Router /unread_mails [get]
// @Success 200	{object} model.GetReceivedMailResponse
// @Failure 400	{object} util.HTTPError
// GetReceivedFromStrangerMails ...
func (c *MailController) GetReceivedFromStrangerMails(g *gin.Context) {
	userID := g.Query("userId")

	if userID == "" {
		util.NewError(g, http.StatusBadRequest, errors.New("userId invalid"), c.logger)
		return
	}
	request := model.GetReceivedMail{}
	request.ToID = userID

	if strangers, err := c.friendService.GetAllStrangers(userID); err != nil {
		util.NewError(g, http.StatusInternalServerError, err, c.logger)
		return
	} else {
		for _, stranger := range strangers {
			request.FromIDs = append(request.FromIDs, stranger.ID)
		}
	}

	if result, err := c.mailService.GetReceived(&request); err != nil {
		util.NewError(g, http.StatusInternalServerError, err, c.logger)
	} else {
		g.JSON(http.StatusOK, result)
	}
}
