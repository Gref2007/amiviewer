var timeline;
var items;
var lastItemId = 0;

export function init(ElementId, actions) {

    if (timeline) {
        timeline.destroy()
    }

    var container = document.getElementById(ElementId);

    // Create a DataSet (allows two way data-binding)
    items = new vis.DataSet([]);  
    // Configuration for the Timeline
    var options = {};

    for (let action of actions) {
        addItem(action);
    }
  
    // Create a Timeline
    timeline = new vis.Timeline(container, items, options);
}


function addItem(action) {
    lastItemId += 1;
    try {
        items.add({
            id: lastItemId,
            content: action.Type,
            start:action.DateTime
        });
    } catch (err) {
        alert(err);
    } 
}