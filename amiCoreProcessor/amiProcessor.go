package amiCoreProcessor

import (
	"amiViewer/draw"
	"bufio"
	"fmt"
	"log"
	"mime/multipart"
)

type AmiProcessor struct {
	amiParser    AmiParser
	DrawActions  []draw.DrawAction
	CurrentState draw.CurrentState
}

func NewAmiProcessor() AmiProcessor {
	return AmiProcessor{
		amiParser:   AmiParser{},
		DrawActions: []draw.DrawAction{},
		CurrentState: draw.CurrentState{
			Channels:       map[string]struct{}{},
			Bridges:        map[string]struct{}{},
			LinkedChannels: [][2]string{},
		},
	}

}

func (processor *AmiProcessor) GetEventsHistory(fileHmtl *multipart.FileHeader) []draw.DrawAction {

	processor.DrawActions = []draw.DrawAction{}

	file, err := fileHmtl.Open()

	if err != nil {
		log.Fatal(err)
	}
	defer file.Close()

	processor.amiParser.RegisterAllEventsParser()

	scanner := bufio.NewScanner(file)

	for scanner.Scan() {
		fmt.Println(scanner.Text())

		event, err := processor.amiParser.GetEventFromString(scanner.Text())

		if err != nil {
			log.Println(err)
			continue
		}

		if err := scanner.Err(); err != nil {
			log.Println(err)
		}

		fmt.Println(event)

		drawAction, err := (*event).Draw(&processor.CurrentState)

		if drawAction != nil {
			processor.DrawActions = append(processor.DrawActions, *drawAction)
		}
	}
	return processor.DrawActions
}
