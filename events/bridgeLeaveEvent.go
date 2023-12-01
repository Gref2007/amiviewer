package events

import (
	"amiViewer/draw"
	"encoding/json"
	"fmt"

	"golang.org/x/exp/slices"
)

// BridgeLeaveEvent event Struct
type BridgeLeaveEvent struct {
	ManagerEvent
	Channel        string
	BridgeUniqueID string
}

// Parse get event from string
func (ble BridgeLeaveEvent) Parse(amistring string) (EventInterface, error) {

	var event BridgeLeaveEvent

	err := json.Unmarshal([]byte(amistring), &event)

	if err != nil {
		return nil, fmt.Errorf("Can not unmarshal event: %w", err)
	}

	return event, nil
}

// Draw get DrawAction for event
func (ble BridgeLeaveEvent) Draw(currentState *draw.CurrentState) (*draw.DrawAction, error) {

	var drawaction = draw.DrawAction{
		EventType:         "BridgeLeaveEvent",
		DateTime:          ble.DateReceived,
		CreateChannel:     []draw.CreateChannel{},
		DisconnectChannel: [][2]string{},
	}

	if len(ble.Channel) > 0 {
		if _, ok := currentState.Channels[ble.Channel]; !ok {
			currentState.Channels[ble.Channel] = struct{}{}
			drawaction.CreateChannel = append(drawaction.CreateChannel, draw.CreateChannel{
				Channel: ble.Channel,
				Type:    draw.Channel,
			})
		}

		var index = slices.IndexFunc(currentState.LinkedChannels, func(linkedChannels [2]string) bool {

			return (linkedChannels[0] == ble.BridgeUniqueID && linkedChannels[1] == ble.Channel) ||
				(linkedChannels[0] == ble.Channel && linkedChannels[1] == ble.BridgeUniqueID)

		})
		if index >= 0 {
			drawaction.DisconnectChannel = append(drawaction.DisconnectChannel, [2]string{ble.BridgeUniqueID, ble.Channel})
			currentState.LinkedChannels = append(currentState.LinkedChannels[:index], currentState.LinkedChannels[index+1:]...)
		}
	}

	return &drawaction, nil
}
