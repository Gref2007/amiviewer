package events

import (
	"amiViewer/draw"
	"log"
	"time"
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
