package amiCoreProcessor

import (
	"amiViewer/events"
	"encoding/json"
	"fmt"
)

type Parser func(json string) (events.EventInterface, error)

type AmiParser struct {
	eventsParsers map[string]Parser
}

func (p *AmiParser) RegisterAllEventsParser() {

	p.eventsParsers = map[string]Parser{}

	p.eventsParsers["AsterNET.Manager.Event.DialBeginEvent, AsterNET"] = events.DialBeginEvent{}.Parse
	p.eventsParsers["AsterNET.Manager.Event.DialEndEvent, AsterNET"] = events.DialEndEvent{}.Parse
	p.eventsParsers["AsterNET.Manager.Event.OriginateResponseEvent, AsterNET"] = events.OriginateResponseEvent{}.Parse
	p.eventsParsers["AsterNET.Manager.Event.BridgeEnterEvent, AsterNET"] = events.BridgeEnterEvent{}.Parse
	p.eventsParsers["AsterNET.Manager.Event.BridgeLeaveEvent, AsterNET"] = events.BridgeLeaveEvent{}.Parse
	p.eventsParsers["AsterNET.Manager.Event.HangupEvent, AsterNET"] = events.HangupEvent{}.Parse
}

func (p *AmiParser) GetEventFromString(amiString string) (*events.EventInterface, error) {

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
		return nil, fmt.Errorf("Error in parser: %w", err)
	}

	return &event, nil
}
