package events

import (
	"time"
)

type ManagerEvent struct {

	// Store all unknown (without setter) keys from manager event.<br/>
	Attributes map[string]string

	// Get/Set the name of the channel.

	Channel string

	// Get/Set the point in time this event was received from the Asterisk server.<br/>
	// Pseudo events that are not directly received from the asterisk server
	// (for example ConnectEvent and DisconnectEvent) may return null.
	DateReceived time.Time

	// Get/Set the AMI authorization class of this event.<br/>
	// This is one or more of system, call, log, verbose, command, agent or user.
	// Multiple privileges are separated by comma.<br/>
	// Note: This property is not available from Asterisk 1.0 servers.
	Privilege string

	// Specify a server to which to send your commands (x.x.x.x or hostname).<br
	// This should match the server name specified in your config file's "host" entry
	// If you do not specify a server, the proxy will pick the first one it finds -- fine in single-server configurations.
	Server string

	// Returns the timestamp for this event.<br/>
	// The timestamp property is available in Asterisk since 1.4
	// if enabled in manager.conf by setting timestampevents = yes.
	// In contains the time the event was generated in seconds since the epoch.

	Timestamp float64

	// Get/Set the unique id of the channel.

	UniqueId string
}
