package main

import (
	"amiViewer/api"

	"github.com/gin-gonic/gin"
)

var (
	router api.Router = *api.NewRouter()
)

func main() {

	r := gin.Default()
	router.SetupRoute(r)

	r.Run()
}
