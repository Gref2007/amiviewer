package events

import (
	"amiViewer/draw"
	"encoding/json"
	"fmt"
)

type DialEndEvent struct {
	DialEvent
}

// Parse get event from string
func (dee DialEndEvent) Parse(amistring string) (EventInterface, error) {

	var event DialEndEvent

	err := json.Unmarshal([]byte(amistring), &event)

	if err != nil {
		return nil, fmt.Errorf("Can not unmarshal event: %w", err)
	}

	return event, nil
}

// Draw get DrawAction for event
func (dee DialEndEvent) Draw(currentState *draw.CurrentState) (*draw.DrawAction, error) {

	var drawaction = draw.DrawAction{
		EventType:      "DialEndEvent",
		DateTime:       dee.DateReceived,
		CreateChannel:  []draw.CreateChannel{},
		ConnectChannel: [][2]string{},
	}

	if _, ok := currentState.Channels[dee.DestChannel]; !ok {
		currentState.Channels[dee.DestChannel] = struct{}{}
		drawaction.CreateChannel = append(drawaction.CreateChannel, draw.CreateChannel{
			Channel: dee.DestChannel,
			Type:    draw.Channel,
		})
	}

	return &drawaction, nil
}
