package main

import (
	"amiViewer/api"
	"net/http"

	"github.com/gin-gonic/gin"
)

var (
	router api.Router = *api.NewRouter()
)

func main() {

	r := gin.Default()
	router.SetupRoute(r)

	//TODO Удалить
	r.GET("/ping", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{
			"message": "pong",
		})
	})
	r.Run()

}
