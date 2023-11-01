package events

import "amiViewer/draw"

type DrawFunction func(e ManagerEvent) draw.DrawAction

type EventEmptyInterface interface{}

type Parser interface {
	Parse(amistring string) ManagerEvent
}
