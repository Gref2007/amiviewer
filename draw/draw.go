package draw

import (
	"encoding/json"
	"fmt"
	"time"
)

type DrawAction struct {
	EventType         string
	DateTime          time.Time
	CreateChannel     []CreateChannel
	ConnectChannel    [][2]string
	DisconnectChannel [][2]string
	DeleteChannel     []string
}

type CurrentState struct {
	Channels       map[string]struct{}
	Bridges        map[string]struct{}
	LinkedChannels [][2]string
}

type CreateChannel struct {
	Channel string
	Type    ChannelType
}

const (
	Channel ChannelType = iota
	LocalChannel
	Bridge
)

type ChannelType int8

func (ct ChannelType) String() string {
	switch ct {
	case Channel:
		return "channel"
	case LocalChannel:
		return "localChannel"
	case Bridge:
		return "bridge"
	default:
		return fmt.Sprintf("%d", int(ct))
	}
}

func (ct ChannelType) MarshalJSON() ([]byte, error) {
	// It is assumed Suit implements fmt.Stringer.
	return json.Marshal(ct.String())
}
