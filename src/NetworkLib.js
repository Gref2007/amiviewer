
var container;
var network;
var nodes;
var edges;

var lastNodeId = 0;


export function init(ElementId, actions) {
    container = document.getElementById(ElementId);
    //nodes = new vis.DataSet();
    //edges = new vis.DataSet();
    nodes = new vis.DataSet([]);
    edges = new vis.DataSet([]);
    lastNodeId = 0;

    for (let action of actions) {
        drawAction(action);
    }

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
            addNode({ Id: lastNodeId, Name: channel });
        }
    }
}

function eraseAction(action) {

}


function addNode(node) {
    try {
        nodes.add({
            id: node.Id,
            label: node.Name,
        });
    } catch (err) {
        alert(err);
    }
}

function updateNode() {
    try {
        nodes.update({
            id: document.getElementById("node-id").value,
            label: document.getElementById("node-label").value,
        });
    } catch (err) {
        alert(err);
    }
}
function removeNode() {
    try {
        nodes.remove({ id: document.getElementById("node-id").value });
    } catch (err) {
        alert(err);
    }
}

function addEdge() {
    try {
        edges.add({
            id: document.getElementById("edge-id").value,
            from: document.getElementById("edge-from").value,
            to: document.getElementById("edge-to").value,
        });
    } catch (err) {
        alert(err);
    }
}
function updateEdge() {
    try {
        edges.update({
            id: document.getElementById("edge-id").value,
            from: document.getElementById("edge-from").value,
            to: document.getElementById("edge-to").value,
        });
    } catch (err) {
        alert(err);
    }
}
function removeEdge() {
    try {
        edges.remove({ id: document.getElementById("edge-id").value });
    } catch (err) {
        alert(err);
    }
}