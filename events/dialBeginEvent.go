package events

import (
	"amiViewer/draw"
	"encoding/json"
	"log"
)

type DialBeginEvent struct {
	DialEvent
}

func (de DialBeginEvent) Parse(amistring string) (EventEmptyInterface, error) {

	var event DialBeginEvent

	err := json.Unmarshal([]byte(amistring), &event)

	if err != nil {
		log.Fatal(err)
		return ManagerEvent{}, err
	}

	return event, nil
}

func (de DialBeginEvent) Draw(ev EventEmptyInterface, currentState *draw.CurrentState) (draw.DrawAction, error) {

	var dialevent = ev.(DialBeginEvent)

	currentState.Channels = append(currentState.Channels, dialevent.DestChannel)

	return draw.DrawAction{}, nil
}
