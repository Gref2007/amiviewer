package events

import (
	"time"
)

type ManagerEvent struct {
	Type         string `json:"$type"`
	Timestamp    float64   `json:"Timestamp"`
	DateReceived time.Time `json:"DateReceived"`
	Privilege    string    `json:"Privilege"`
	Server       string    `json:"Server"`
	UniqueId     string    `json:"UniqueId"`
	Attributes   map[string]string
	Channel      string		
}
