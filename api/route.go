package api

import (
	"amiViewer/api/controller"

	"github.com/gin-gonic/gin"
)

type Router struct {
}

func NewRouter() *Router {
	return &Router{}
}

func (r *Router) SetupRoute(g *gin.Engine) {

	var drawController *controller.DrawController = controller.NewDrawController()

	api := g.Group("/api")
	{
		v1 := api.Group("/v1")
		v1.POST("draw", drawController.GetDraw)
	}

}
