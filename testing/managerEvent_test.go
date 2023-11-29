package main

import (
	"amiViewer/draw"
	"amiViewer/events"
	"testing"

	"github.com/stretchr/testify/assert"
)

func TestRegex(t *testing.T) {

	type ExpectTest struct {
		IsLocal      bool
		CreatChannel []string
	}

	tests := []struct {
		Name   string
		In     string
		Expect ExpectTest
	}{
		{"Origin", "Local/0000002745@dialout-00000026;1", ExpectTest{true, []string{"Local/0000002745@dialout-00000026;1", "Local/0000002745@dialout-00000026;2"}}},
		{"NotLocal", "/0000002745@dialout-00000026;1", ExpectTest{false, []string{}}},
		{"Localdiff", "Local/6;1", ExpectTest{true, []string{"Local/6;1", "Local/6;2"}}},
	}

	for _, test := range tests {

		event := events.ManagerEvent{}

		var drawaction = draw.DrawAction{
			CreateChannel:  []draw.CreateChannel{},
			ConnectChannel: [][2]string{},
		}

		var currentState = draw.CurrentState{
			Channels:       map[string]struct{}{},
			Bridges:        map[string]struct{}{},
			LinkedChannels: [][2]string{},
		}

		var result = event.CreateLocalChannels(&drawaction, &currentState, test.In)

		assert := assert.New(t)

		assert.Equal(result, test.Expect.IsLocal, "Result IsLocal was incorrect")

		assert.Equal(len(currentState.Channels), len(test.Expect.CreatChannel), "Count of  CreatChannel was incorrect")

		for i := 0; i < len(test.Expect.CreatChannel); i++ {			
			assert.Contains(currentState.Channels,test.Expect.CreatChannel[i] ,  "Don't found channel in result")
		}
	}

}
