'use strict';

import mongoose from 'mongoose';
import {registerEvents} from './location.events';

var LocationSchema = new mongoose.Schema({
    id: Number,
    type: String,
    name: String,
    location: String,
    accuracy: Number,
    latitude: Number,
    longitude: Number
});

registerEvents(LocationSchema);
export default mongoose.model('Location', LocationSchema);
