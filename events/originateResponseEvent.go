package events

import (
	"amiViewer/draw"
	"encoding/json"
	"fmt"
)

// OriginateResponseEvent event Struct
type OriginateResponseEvent struct {
	ManagerEvent
}

// Parse get event from string
func (ore OriginateResponseEvent) Parse(amistring string) (EventInterface, error) {

	var event OriginateResponseEvent

	err := json.Unmarshal([]byte(amistring), &event)

	if err != nil {
		return nil, fmt.Errorf("Can not unmarshal event: %w", err)
	}

	return event, nil
}

// Draw get DrawAction for event
func (ore OriginateResponseEvent) Draw(currentState *draw.CurrentState) (*draw.DrawAction, error) {

	var draw = draw.DrawAction{
		Type:          "OriginateResponseEvent",
		DateTime:      ore.DateReceived, //TODO добавить настройку, чтобы можно было брать дата из timestamp
		CreateChannel: []string{},
	}

	if len(ore.Channel) > 0 {
		if _, ok := currentState.Channels[ore.Channel]; !ok {
			currentState.Channels[ore.Channel] = struct{}{}
			draw.CreateChannel = append(draw.CreateChannel, ore.Channel)
		}
	}

	return &draw, nil
}
