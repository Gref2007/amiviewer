package amiCoreProcessor

import (
	"amiViewer/events"
	"encoding/json"
	"fmt"
	"log"
)

type Parser func(json string) (events.EventEmptyInterface, error)

type AmiParser struct {
	eventsParsers map[string]Parser
}

func (p *AmiParser) RegisterAllEventsParser() {

	p.eventsParsers = map[string]Parser{}

	p.eventsParsers["AsterNET.Manager.Event.DialBeginEvent, AsterNET"] = events.DialBeginEvent{}.Parse
}

func (p *AmiParser) GetEventFromString(amiString string) (*events.EventEmptyInterface, error) {

	var managerEvent events.ManagerEvent

	err := json.Unmarshal([]byte(amiString), &managerEvent)

	if err != nil {
		return nil, fmt.Errorf("not Manager Event: %w", err)
	}

	eventParser, ok := p.eventsParsers[managerEvent.Type]

	if !ok {
		return nil, fmt.Errorf("no parser registered for this event: %w", err)
	}

	event, err := eventParser(amiString)

	if err != nil {
		log.Fatal(err)
	}

	return &event, nil
}
