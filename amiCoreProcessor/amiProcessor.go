package amiCoreProcessor

import (
	"amiViewer/draw"
	"amiViewer/events"
	"bufio"
	"fmt"
	"log"
	"mime/multipart"
)

type Draw func(ev events.EventEmptyInterface, currentState *draw.CurrentState) (draw.DrawAction, error)

type AmiProcessor struct {
	amiParser    AmiParser
	EventDrawers map[string]Draw
	DrawActions  []draw.DrawAction
	CurrentState draw.CurrentState
}

func NewAmiProcessor() AmiProcessor {
	return AmiProcessor{
		amiParser:    AmiParser{},
		EventDrawers: map[string]Draw{},
		DrawActions:  []draw.DrawAction{},
		CurrentState: draw.CurrentState{},
	}

}

func (processor *AmiProcessor) RegisterEventProcessor() {
	processor.EventDrawers["AsterNET.Manager.Event.DialBeginEvent, AsterNET"] = events.DialBeginEvent{}.Draw
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
			log.Fatal(err)
		}

		if err := scanner.Err(); err != nil {
			log.Fatal(err)
		}

		fmt.Println(event)

		drawAction, err := processor.EventDrawers[(*event).(events.DialBeginEvent).Type](*event, &processor.CurrentState)
		if err != nil {
			log.Fatal(err)
		}

		processor.DrawActions = append(processor.DrawActions, drawAction)
	}

	return processor.DrawActions
}
