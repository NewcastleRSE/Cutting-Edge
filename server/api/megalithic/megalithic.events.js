/**
 * Megalithic model events
 */

'use strict';

import {EventEmitter} from 'events';
var MegalithicEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
MegalithicEvents.setMaxListeners(0);

// Model events
var events = {
    save: 'save',
    remove: 'remove'
};

// Register the event emitter to the model events
function registerEvents(Megalithic) {
    for(var e in events) {
        let event = events[e];
        Megalithic.post(e, emitEvent(event));
    }
}

function emitEvent(event) {
    return function(doc) {
        MegalithicEvents.emit(event + ':' + doc._id, doc);
        MegalithicEvents.emit(event, doc);
    };
}

export {registerEvents};
export default MegalithicEvents;
