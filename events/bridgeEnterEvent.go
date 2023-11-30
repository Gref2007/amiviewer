package events

import (
	"amiViewer/draw"
	"encoding/json"
	"fmt"

	"golang.org/x/exp/slices"
)

// BridgeEnterEvent event Struct
type BridgeEnterEvent struct {
	ManagerEvent
	Channel        string
	BridgeUniqueID string
}

// Parse get event from string
func (bee BridgeEnterEvent) Parse(amistring string) (EventInterface, error) {

	var event BridgeEnterEvent

	err := json.Unmarshal([]byte(amistring), &event)

	if err != nil {
		return nil, fmt.Errorf("Can not unmarshal event: %w", err)
	}

	return event, nil
}

// Draw get DrawAction for event
func (bee BridgeEnterEvent) Draw(currentState *draw.CurrentState) (*draw.DrawAction, error) {

	var drawaction = draw.DrawAction{
		EventType:      "BridgeEnterEvent",
		DateTime:       bee.DateReceived, //TODO добавить настройку, чтобы можно было брать дата из timestamp
		CreateChannel:  []draw.CreateChannel{},
		ConnectChannel: [][2]string{},
	}

	if _, ok := currentState.Bridges[bee.BridgeUniqueID]; !ok {
		currentState.Bridges[bee.BridgeUniqueID] = struct{}{}
		drawaction.CreateChannel = append(drawaction.CreateChannel, draw.CreateChannel{
			Channel: bee.BridgeUniqueID,
			Type:    draw.Bridge,
		})
	}

	if len(bee.Channel) > 0 {
		if _, ok := currentState.Channels[bee.Channel]; !ok {
			currentState.Channels[bee.Channel] = struct{}{}
			drawaction.CreateChannel = append(drawaction.CreateChannel, draw.CreateChannel{
				Channel: bee.Channel,
				Type:    draw.Channel,
			})
		}

		var contain = slices.ContainsFunc(currentState.LinkedChannels, func(linkedChannels [2]string) bool {
			return (linkedChannels[0] == bee.Channel && linkedChannels[1] == bee.BridgeUniqueID) ||
				(linkedChannels[0] == bee.BridgeUniqueID && linkedChannels[1] == bee.Channel)
		})

		if !contain {
			currentState.LinkedChannels = append(currentState.LinkedChannels, [2]string{bee.Channel, bee.BridgeUniqueID})
			drawaction.ConnectChannel = append(drawaction.ConnectChannel, [2]string{bee.Channel, bee.BridgeUniqueID})
		}
	}

	return &drawaction, nil
}
