package controller

import (
	"amiViewer/amiCoreProcessor"
	"net/http"

	"github.com/gin-gonic/gin"
)

type DrawController struct{}

func NewDrawController() *DrawController {
	return &DrawController{}
}

func (dc *DrawController) GetDraw(ctx *gin.Context) {

	file, err := ctx.FormFile("file")

	// The file cannot be received.
	if err != nil {
		ctx.AbortWithStatusJSON(http.StatusBadRequest, gin.H{
			"message": "No file is received",
		})
		return
	}

	var processor = amiCoreProcessor.NewAmiProcessor()
	processor.RegisterEventProcessor()
	drawEvents := processor.GetEventsHistory(file)

	ctx.IndentedJSON(http.StatusOK, drawEvents)
}
