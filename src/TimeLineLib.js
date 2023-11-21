import * as NetworkLib from './NetworkLib.js';

var timeline;
var items;
var lastItemId = -1;
var actions;
var currentItemId = 0;

export function init(ElementId, jsonActions) {

    actions = jsonActions;
    lastItemId = -1;
    currentItemId = 0;


    if (timeline) {
        timeline.destroy()
    }

    var container = document.getElementById(ElementId);

    // Create a DataSet (allows two way data-binding)
    items = new vis.DataSet();
    // Configuration for the Timeline
    var options = {};

    for (let action of actions) {
        addItem(action);
    }

    // Create a Timeline
    timeline = new vis.Timeline(container, items, options);
    timeline.setSelection(currentItemId, { focus: false });

    timeline.on('select', onItemSelect);

    document.addEventListener("keydown", function (evt) {
        if (evt.code == "ArrowLeft") {
            moveBack();
        }
        if (evt.code == "ArrowRight") {
            moveForvard();
        }
    }
    );
}


function addItem(action) {
    lastItemId += 1;
    try {
        items.add({
            id: lastItemId,
            content: action.Type,
            start: action.DateTime
        });
    } catch (err) {
        alert(err);
    }
}

function onItemSelect(properties) {
    let itemId = properties.items[0];
    if (currentItemId == itemId) {
        return
    }

    NetworkLib.redrawGrah(currentItemId + 1, itemId + 1);

    currentItemId = itemId;
}

function moveForvard() {
    if (currentItemId != lastItemId) {
        currentItemId++;
        timeline.setSelection(currentItemId, { focus: false });
        NetworkLib.redrawGrah(currentItemId, currentItemId + 1);

    }


}

function moveBack() {
    if (currentItemId != 0) {
        currentItemId--;
        timeline.setSelection(currentItemId, { focus: false });
        NetworkLib.redrawGrah(currentItemId + 1, currentItemId);
    }
}