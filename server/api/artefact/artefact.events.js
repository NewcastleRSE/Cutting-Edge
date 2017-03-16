/**
 * Artefact model events
 */

'use strict';

import {EventEmitter} from 'events';
var ArtefactEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
ArtefactEvents.setMaxListeners(0);

// Model events
var events = {
    save: 'save',
    remove: 'remove'
};

// Register the event emitter to the model events
function registerEvents(Artefact) {
    for(var e in events) {
        let event = events[e];
        Artefact.post(e, emitEvent(event));
    }
}

function emitEvent(event) {
    return function(doc) {
        ArtefactEvents.emit(event + ':' + doc._id, doc);
        ArtefactEvents.emit(event, doc);
    };
}

export {registerEvents};
export default ArtefactEvents;
