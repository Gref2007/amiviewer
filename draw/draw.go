package draw

type DrawAction struct {
	Connect [][2]string
	Create  []string
}

type CurrentState struct {
	Channels       []string
	Bridges        []string
	LinkedChannels [][2]string
	LinkedBridges  [][2]string
}

