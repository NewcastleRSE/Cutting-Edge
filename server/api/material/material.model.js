'use strict';

import mongoose from 'mongoose';
import {registerEvents} from './material.events';

var ChildSchema = new mongoose.Schema({
    id: Number,
    name: String,
    parentId: Number
});

var MaterialSchema = new mongoose.Schema({
    id: Number,
    name: String,
    parentId: Number,
    children: [ChildSchema]
});

registerEvents(MaterialSchema);
export default mongoose.model('Material', MaterialSchema);
