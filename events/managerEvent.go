package events

import (
	"amiViewer/draw"
	"log"
	"regexp"
	"strconv"
	"strings"
	"time"

	"golang.org/x/exp/slices"
)

type ManagerEvent struct {
	Type         string    `json:"$type"`
	Timestamp    float64   `json:"Timestamp"`
	DateReceived time.Time `json:"DateReceived"`
	Privilege    string    `json:"Privilege"`
	Server       string    `json:"Server"`
	UniqueId     string    `json:"UniqueId"`
	Attributes   map[string]string
	Channel      string
}

func (me ManagerEvent) GetType() string {
	return me.Type
}

func (me ManagerEvent) Draw(ev EventTypeInterface, currentState *draw.CurrentState) (*draw.DrawAction, error) {
	log.Print("Don't implemented Event Draw")
	return nil, nil
}

func (me ManagerEvent) CreateLocalChannels(drawaction *draw.DrawAction, currentState *draw.CurrentState, channel string) bool {

	if strings.Contains(channel, "Local") {
		var isLocal, _ = regexp.MatchString(`Local\/.*;[1,2]`, channel)
		if isLocal {

			//create first localChannel
			currentState.Channels[channel] = struct{}{}
			drawaction.CreateChannel = append(drawaction.CreateChannel, draw.CreateChannel{
				Channel: channel,
				Type:    draw.LocalChannel,
			})

			var channelNum, _ = strconv.Atoi(channel[len(channel)-1:])

			if channelNum == 1 {
				channelNum++
			} else {
				channelNum--
			}

			//create second localChannel
			var secondChannel = channel[:len(channel)-1] + strconv.Itoa(channelNum)
			currentState.Channels[secondChannel] = struct{}{}
			drawaction.CreateChannel = append(drawaction.CreateChannel, draw.CreateChannel{
				Channel: secondChannel,
				Type:    draw.LocalChannel,
			})

			var contain = slices.ContainsFunc(currentState.LinkedChannels, func(linkedChannels [2]string) bool {

				return (linkedChannels[0] == channel && linkedChannels[1] == secondChannel) ||
					(linkedChannels[0] == secondChannel && linkedChannels[1] == channel)
			})

			if !contain {
				currentState.LinkedChannels = append(currentState.LinkedChannels, [2]string{channel, secondChannel})
				drawaction.ConnectChannel = append(drawaction.ConnectChannel, [2]string{channel, secondChannel})
			}

			return true
		}
	}

	return false

}
