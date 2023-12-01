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
        document.removeEventListener("keydown", arrowPush);
    }

    var container = document.getElementById(ElementId);

    items = new vis.DataSet();
    var options = {
        order: (a, b) => { // I don't know how it works, but it help keep order in timeline elements
            // order by id
            return a.id - b.id;
        }
    };

    for (let index = 0; index < actions.length; index++) {
        addItem(actions[index], index);
    }

    // Create a Timeline
    timeline = new vis.Timeline(container, items, options);
    timeline.setSelection(currentItemId, { focus: false });

    timeline.on('select', onItemSelect);

    document.addEventListener("keydown", arrowPush);
}

function arrowPush(evt) {
    if (evt.code == "ArrowLeft") {
        moveBack();
    }
    if (evt.code == "ArrowRight") {
        moveForvard();
    }
}

function addItem(action, index) {
    lastItemId += 1;
    try {
        items.add({
            id: lastItemId,
            content: action.EventType + index,
            start: action.DateTime
        });
    } catch (err) {
        alert(err);
    }
}

function onItemSelect(properties) {
    let itemId = properties.items[0];
    if (itemId == null || currentItemId == itemId) {
        return
    }

    NetworkLib.redrawGrah(currentItemId, itemId);

    currentItemId = itemId;
}

function moveForvard() {
    if (currentItemId != lastItemId) {        
        NetworkLib.redrawGrah(currentItemId, currentItemId + 1);
        currentItemId++;
        timeline.setSelection(currentItemId, { focus: false });
    }
}

function moveBack() {
    if (currentItemId != 0) {        
        NetworkLib.redrawGrah(currentItemId, currentItemId - 1);        
        currentItemId--;
        timeline.setSelection(currentItemId, { focus: false });
    }
}