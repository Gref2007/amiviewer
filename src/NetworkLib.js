
var container;
var network;
var nodes;
var edges;
var actions;

var lastNodeId = -1;
var lastEdgeId = -1;


export function init(ElementId, jsonActions) {
    lastNodeId = -1;
    lastEdgeId = -1;   
    actions = jsonActions;
    container = document.getElementById(ElementId);
    nodes = new vis.DataSet();
    edges = new vis.DataSet();


    drawAction(actions[0]);

    var data = {
        nodes: nodes,
        edges: edges,
    };
    var options = {};

    network = new vis.Network(container, data, options);
}

function drawAction(action) {

    if (action.CreateChannel) {

        for (let channel of action.CreateChannel) {
            lastNodeId += 1;
            addNode(lastNodeId, channel);
        }
    }

    if (action.CreateBridge) {
        for (let bridge of action.CreateBridge) {
            lastNodeId += 1;
            addNode(lastNodeId, bridge);
        }
    }

    if (action.ConnectChannel) {
        for (let connect of action.ConnectChannel) {
            lastEdgeId += 1;
            addEdge(lastEdgeId, connect[0], connect[1]);
        }
    }

    if (action.DisconnectChannel) {
        action.DisconnectChannel.forEach(disconnect => {
            removeEdge(disconnect[0], disconnect[1]);            
        });        
    }
}

function eraseAction(action) {

    if (action.DisconnectChannel) {
        for (let disconnectChannel of action.DisconnectChannel) { 
            lastEdgeId += 1;           
            addEdge(lastEdgeId, disconnectChannel[0], disconnectChannel[1]);            
        }
    }

    if (action.ConnectChannel) {
        action.ConnectChannel.forEach(connectChannel => {
            removeEdge(connectChannel[0], connectChannel[1]);            
        });
    }

    if (action.CreateChannel) {
        action.CreateChannel.forEach(channel => {
            removeNode(channel);            
        });
    }
    if (action.CreateBridge) {
        action.CreateBridge.forEach(bridge => {
            removeNode(bridge);
        });
    }
}


function addNode(nodeId, channel) {
    try {
        nodes.add({
            id: nodeId,
            label: channel,
        });
    } catch (err) {
        alert(err);
    }
}


function removeNode(label) {
    try {
        let nodeId = nodes.get({
            filter: function (node) {
                return (node.label == label);
            }
        })[0].id;

        nodes.remove( { id:nodeId } );
    } catch (err) {
        alert(err);
    }
}

function addEdge(edgeId, fromChannel, toChannel) {
    try {
        let nodeFromId = nodes.get({
            filter: function (node) {
                return (node.label == fromChannel);
            }
        })[0].id;

        //= nodes.find(node => node.label == fromChannel).Id;
        let nodeToId = nodes.get({
            filter: function (node) {
                return (node.label == toChannel);
            }
        })[0].id;
        edges.add({
            id: edgeId,
            from: nodeFromId,
            to: nodeToId,
        });
    } catch (err) {
        alert(err);
    }
}


function removeEdge(label1,label2) {
    try {

        let node1Id = nodes.get({
            filter: function (node) {
                return (node.label == label1);
            }
        })[0].id;

        let node2Id = nodes.get({
            filter: function (node) {
                return (node.label == label2);
            }
        })[0].id;

        let edgeId = edges.get({
            filter: function (edge) {
                return (edge.from == node1Id) && (edge.to == node2Id) || (edge.from == node2Id)&& (edge.to == node1Id);
            }
        })[0].id;


        edges.remove({ id: edgeId });
    } catch (err) {
        alert(err);
    }
}

export function redrawGrah(from, to) {
    if (from < to) {
        let newActions = actions.slice(from, to);
        newActions.forEach(x => drawAction(x))
    } else {
        let newActions = actions.slice(to + 1, from + 1);
        newActions.reverse().forEach(x => eraseAction(x))
    }
}