package events

import "amiViewer/draw"

type DrawFunction func(e ManagerEvent) draw.DrawAction

type EventTypeInterface interface {
	GetType() string
}

type EventInterface interface {
	EventTypeInterface
	Draw(currentState *draw.CurrentState) (*draw.DrawAction, error)
}
