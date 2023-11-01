package draw

import "time"

type DrawAction struct {
	Type           string
	DateTime       time.Time
	CreateChannel  []string
	CreateBridge   []string
	ConnectChannel [][2]string
	ConnectBridge  [][2]string
}

type CurrentState struct {
	Channels       []string
	Bridges        []string
	LinkedChannels [][2]string
	LinkedBridges  [][2]string
}
