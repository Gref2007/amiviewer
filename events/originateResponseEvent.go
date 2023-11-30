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

	var drawaction = draw.DrawAction{
		EventType:     "OriginateResponseEvent",
		DateTime:      ore.DateReceived, //TODO добавить настройку, чтобы можно было брать дата из timestamp
		CreateChannel: []draw.CreateChannel{},
	}

	if len(ore.Channel) > 0 {
		if _, ok := currentState.Channels[ore.Channel]; !ok {
			currentState.Channels[ore.Channel] = struct{}{}
			drawaction.CreateChannel = append(drawaction.CreateChannel, draw.CreateChannel{
				Channel: ore.Channel,
				Type:    draw.Channel,
			})
		}
	}

	return &drawaction, nil
}
