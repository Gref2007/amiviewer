package events

import (
	"amiViewer/draw"
	"encoding/json"
	"fmt"
)

type HangupEvent struct {
	ManagerEvent
	Channel string
}

// Parse get event from string
func (he HangupEvent) Parse(amistring string) (EventInterface, error) {

	var event HangupEvent

	err := json.Unmarshal([]byte(amistring), &event)

	if err != nil {
		return nil, fmt.Errorf("Can not unmarshal event: %w", err)
	}

	return event, nil
}

// Draw get DrawAction for event
func (he HangupEvent) Draw(currentState *draw.CurrentState) (*draw.DrawAction, error) {

	var draw = draw.DrawAction{
		EventType:         "HangupEvent",
		DateTime:          he.DateReceived, //TODO добавить настройку, чтобы можно было брать дата из timestamp
		DeleteChannel:     []string{},
		DisconnectChannel: [][2]string{},
	}

	if _, ok := currentState.Channels[he.Channel]; ok {

		//delete exist connection
		for i := len(currentState.LinkedChannels) - 1; i >= 0; i-- {
			if currentState.LinkedChannels[i][0] == he.Channel || currentState.LinkedChannels[i][1] == he.Channel {
				draw.DisconnectChannel = append(draw.DisconnectChannel, [2]string{currentState.LinkedChannels[i][0], currentState.LinkedChannels[i][1]})
				currentState.LinkedChannels = append(currentState.LinkedChannels[:i], currentState.LinkedChannels[i+1:]...)
			}
		}

		//delete channel
		delete(currentState.Channels, he.Channel)
		draw.DeleteChannel = append(draw.DeleteChannel, he.Channel)
	}

	return &draw, nil
}
