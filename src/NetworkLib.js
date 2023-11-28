var container;
var network;
var nodes;
var edges;
var actions;

var lastNodeId = -1;
var lastEdgeId = -1;

var virtualData;

const nodeTypes = { Channel: 'channel', LocalChannel: 'localChannel', Bridge: 'bridge' };

export function init(ElementId, jsonActions) {
    lastNodeId = -1;
    lastEdgeId = -1;
    actions = jsonActions;

    container = document.getElementById(ElementId);
    createVirtualNetwork(container, actions);
}

function createVirtualNetwork(container, actions) {
    var options = {
        height: '100%',
        width: '100%',
        layout: {           
            improvedLayout: true,
        },
        edges: {
            smooth: {
                enabled: false,
            }
        },
        physics:
        {
            enabled: true,
            solver: 'hierarchicalRepulsion',
            hierarchicalRepulsion: {
                springConstant: 0.1,
                avoidOverlap: 0.2,
                //nodeDistance: 100,
            },
        }          
    };

    var data = {
        nodes: new vis.DataSet(),
        edges: new vis.DataSet(),
    };

    virtualData = {
        nodes: new Map(),
    }

    for (let action of actions) {
        if (action.CreateChannel) {
            for (let channel of action.CreateChannel) {
                lastNodeId += 1;
                let id = addNode(data.nodes, lastNodeId, channel, "box", null, 100);
                virtualData.nodes.set(channel, { id: id })
            }
        }

        if (action.CreateBridge) {
            for (let bridge of action.CreateBridge) {
                lastNodeId += 1;
                let id = addNode(data.nodes, lastNodeId, bridge, "box", "rgb(190, 219, 218)", 100);
                virtualData.nodes.set(bridge, { id: id })
            }
        }

        if (action.ConnectChannel) {
            for (let connect of action.ConnectChannel) {
                lastEdgeId += 1;
                let id = addEdge(data.nodes, data.edges, lastEdgeId, connect[0], connect[1]);
            }
        }
    }

    network = new vis.Network(container, data, options);
    network.on("stabilized", function () {
        finishInitialize(container, actions, options, network);
    });

    network.startSimulation();
    network.stabilize();
    network.fit();
}

function finishInitialize(container, actions, options, virtualNetwork) {

    for (let node of virtualData.nodes) {
        let position = virtualNetwork.getPosition(node[1].id);
        node[1].x = position.x;
        node[1].y = position.y;
    }

    let scale = virtualNetwork.getScale();
    let viewPosition = virtualNetwork.getViewPosition();

    virtualNetwork.destroy();

    nodes = new vis.DataSet();
    edges = new vis.DataSet();

    var data = {
        nodes: nodes,
        edges: edges,
    };

    options.physics = {
        enabled: false,
    };

    network = new vis.Network(container, data, options);
    network.moveTo({
        position: { x: viewPosition.x, y: viewPosition.y },
        scale: scale,
    });
    drawAction(actions[0]);

    network.on("dragEnd", function (event) {
        for (let nodeId of event.nodes) {
            let position = network.getPosition(nodeId);
            let label = nodes.get(nodeId).label;
            let virtualnode = virtualData.nodes.get(label);
            virtualnode.x = position.x;
            virtualnode.y = position.y;
        }
    });
}

function drawAction(action) {
    if (action.CreateChannel) {
        for (let channel of action.CreateChannel) {
            lastNodeId += 1;
            addNode(nodes, lastNodeId, channel, "box", null, 100);
        }
    }

    if (action.CreateBridge) {
        for (let bridge of action.CreateBridge) {
            lastNodeId += 1;
            addNode(nodes, lastNodeId, bridge, "box", "rgb(190, 219, 218)", 100);
        }
    }

    if (action.ConnectChannel) {
        for (let connect of action.ConnectChannel) {
            lastEdgeId += 1;
            addEdge(nodes, edges, lastEdgeId, connect[0], connect[1]);
        }
    }

    if (action.DisconnectChannel) {
        action.DisconnectChannel.forEach(disconnect => {
            removeEdge(edges, disconnect[0], disconnect[1]);
        });
    }

    if (action.DeleteChannel) {
        action.DeleteChannel.forEach(deleteChannel => {
            removeNode(nodes, deleteChannel);
        });
    }
}

function eraseAction(action) {
    if (action.DeleteChannel) {
        for (let deleteChannel of action.DeleteChannel) {
            lastNodeId += 1;
            addNode(nodes, lastNodeId, deleteChannel, "box");
        }
    }

    if (action.DisconnectChannel) {
        for (let disconnectChannel of action.DisconnectChannel) {
            lastEdgeId += 1;
            addEdge(nodes, edges, lastEdgeId, disconnectChannel[0], disconnectChannel[1]);
        }
    }

    if (action.ConnectChannel) {
        action.ConnectChannel.forEach(connectChannel => {
            removeEdge(edges, connectChannel[0], connectChannel[1]);
        });
    }

    if (action.CreateChannel) {
        action.CreateChannel.forEach(channel => {
            removeNode(nodes, channel);
        });
    }
    if (action.CreateBridge) {
        action.CreateBridge.forEach(bridge => {
            removeNode(nodes, bridge);
        });
    }
}

function addNode(nodes, nodeId, channel, shape, color, widthConstraint) {
    try {
        let vertNode = virtualData ? virtualData.nodes.get(channel) : null;
        return nodes.add({
            id: nodeId,
            label: channel,
            shape: shape,
            color: color,
            widthConstraint: { maximum: widthConstraint },
            x: vertNode?.x,
            y: vertNode?.y            
        })[0];
    } catch (err) {
        alert(err);
    }
}

function removeNode(nodes, label) {
    try {
        let nodeId = nodes.get({
            filter: function (node) {
                return (node.label == label);
            }
        })[0].id;

        nodes.remove({ id: nodeId });
    } catch (err) {
        alert(err);
    }
}

function addEdge(nodes, edges, edgeId, fromChannel, toChannel) {
    try {
        let nodeFromId = nodes.get({
            filter: function (node) {
                return (node.label == fromChannel);
            }
        })[0].id;

        let nodeToId = nodes.get({
            filter: function (node) {
                return (node.label == toChannel);
            }
        })[0].id;

        return edges.add({
            id: edgeId,
            from: nodeFromId,
            to: nodeToId,
        })[0];
    } catch (err) {
        alert(err);
    }
}


function removeEdge(edges, label1, label2) {
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
                return (edge.from == node1Id) && (edge.to == node2Id) || (edge.from == node2Id) && (edge.to == node1Id);
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