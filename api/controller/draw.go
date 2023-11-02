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

	var processor = amiCoreProcessor.NewAmiProcessor()
	processor.RegisterEventProcessor()
	drawEvents := processor.GetEventsHistory("example.astl")

	ctx.IndentedJSON(http.StatusOK, drawEvents)
}
