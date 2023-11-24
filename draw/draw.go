package draw

import "time"

type DrawAction struct {
	Type              string
	DateTime          time.Time
	CreateChannel     []string
	CreateBridge      []string
	ConnectChannel    [][2]string
	DisconnectChannel [][2]string
	DeleteChannel     []string
}

type CurrentState struct {
	Channels       map[string]struct{}
	Bridges        map[string]struct{}
	LinkedChannels [][2]string
}
