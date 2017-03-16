/**
 * Material model events
 */

'use strict';

import {EventEmitter} from 'events';
var MaterialEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
MaterialEvents.setMaxListeners(0);

// Model events
var events = {
  save: 'save',
  remove: 'remove'
};

// Register the event emitter to the model events
function registerEvents(Material) {
  for(var e in events) {
    let event = events[e];
    Material.post(e, emitEvent(event));
  }
}

function emitEvent(event) {
  return function(doc) {
    MaterialEvents.emit(event + ':' + doc._id, doc);
    MaterialEvents.emit(event, doc);
  };
}

export {registerEvents};
export default MaterialEvents;
