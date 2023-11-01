package events

type DialEvent struct {
	ManagerEvent
	DestChannel          string `json:"DestChannel"`
	DestChannelState     string `json:"DestChannelState"`
	DestChannelStateDesc string `json:"DestChannelStateDesc"`
	DestCallerIDNum      string `json:"DestCallerIdNum"`
	DestLinkedID         string `json:"DestLinkedId"`
	DestUniqueID         string `json:"DestUniqueId"`
	DialString           string `json:"DialString"`
}
