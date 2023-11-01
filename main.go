package main

import (
	"amiViewer/amiCoreProcessor"
)

func main() {

	var processor = amiCoreProcessor.NewAmiProcessor()
	processor.RegisterEventProcessor()
	processor.GetEventsHistory("example.astl")

}
