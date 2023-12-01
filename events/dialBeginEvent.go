package events

import (
	"amiViewer/draw"
	"encoding/json"
	"fmt"
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

	var drawaction = draw.DrawAction{
		EventType:      "DialBeginEvent",
		DateTime:       dbe.DateReceived,
		CreateChannel:  []draw.CreateChannel{},
		ConnectChannel: [][2]string{},
	}

	if _, ok := currentState.Channels[dbe.DestChannel]; !ok {
		//If it not localChannel
		if !dbe.CreateLocalChannels(&drawaction, currentState, dbe.DestChannel) {
			currentState.Channels[dbe.DestChannel] = struct{}{}
			drawaction.CreateChannel = append(drawaction.CreateChannel, draw.CreateChannel{
				Channel: dbe.DestChannel,
				Type:    draw.Channel,
			})
		}
	}

	if len(dbe.Channel) > 0 {
		//If it not localChannel
		if _, ok := currentState.Channels[dbe.Channel]; !ok {
			if !dbe.CreateLocalChannels(&drawaction, currentState, dbe.DestChannel) {
				currentState.Channels[dbe.Channel] = struct{}{}
				drawaction.CreateChannel = append(drawaction.CreateChannel, draw.CreateChannel{
					Channel: dbe.Channel,
					Type:    draw.Channel,
				})
			}
		}

		//Probably we shouldn't do this
		// var contain = slices.ContainsFunc(currentState.LinkedChannels, func(linkedChannels [2]string) bool {
		// 	return (linkedChannels[0] == dbe.Channel && linkedChannels[1] == dbe.DestChannel) ||
		// 		(linkedChannels[0] == dbe.DestChannel && linkedChannels[1] == dbe.Channel)
		// })

		// if !contain {
		// 	currentState.LinkedChannels = append(currentState.LinkedChannels, [2]string{dbe.Channel, dbe.DestChannel})
		// 	drawaction.ConnectChannel = append(drawaction.ConnectChannel, [2]string{dbe.Channel, dbe.DestChannel})
		// }
	}

	return &drawaction, nil
}
