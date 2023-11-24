package events

import (
	"amiViewer/draw"
	"encoding/json"
	"fmt"

	"golang.org/x/exp/slices"
)

// DialBeginEvent event Struct
type DialBeginEvent struct {
	DialEvent
}

// Parse get event from string
func (dbe DialBeginEvent) Parse(amistring string) (EventInterface, error) {

	var event DialBeginEvent

	err := json.Unmarshal([]byte(amistring), &event)

	if err != nil {
		return nil, fmt.Errorf("Can not unmarshal event: %w", err)
	}

	return event, nil
}

// Draw get DrawAction for event
func (dbe DialBeginEvent) Draw(currentState *draw.CurrentState) (*draw.DrawAction, error) {

	var draw = draw.DrawAction{
		Type:           "DialBeginEvent",
		DateTime:       dbe.DateReceived, //TODO добавить настройку, чтобы можно было брать дата из timestamp
		CreateChannel:  []string{},
		ConnectChannel: [][2]string{},
	}

	if _, ok := currentState.Channels[dbe.DestChannel]; !ok {
		currentState.Channels[dbe.DestChannel] = struct{}{}
		draw.CreateChannel = append(draw.CreateChannel, dbe.DestChannel)
	}

	if len(dbe.Channel) > 0 {
		if _, ok := currentState.Channels[dbe.Channel]; !ok {
			currentState.Channels[dbe.Channel] = struct{}{}
			draw.CreateChannel = append(draw.CreateChannel, dbe.Channel)
		}

		var contain = slices.ContainsFunc(currentState.LinkedChannels, func(linkedChannels [2]string) bool {

			return (linkedChannels[0] == dbe.Channel && linkedChannels[1] == dbe.DestChannel) ||
				(linkedChannels[0] == dbe.DestChannel && linkedChannels[1] == dbe.Channel)
		})

		if !contain {
			currentState.LinkedChannels = append(currentState.LinkedChannels, [2]string{dbe.Channel, dbe.DestChannel})
			draw.ConnectChannel = append(draw.ConnectChannel, [2]string{dbe.Channel, dbe.DestChannel})
		}
	}

	return &draw, nil
}
