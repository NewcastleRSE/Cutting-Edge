'use strict';

import mongoose from 'mongoose';
import {registerEvents} from './period.events';

var ChildSchema = new mongoose.Schema({
    id: Number,
    name: String,
    periodStart: Number,
    periodEnd: Number,
    parentId: Number
});

var PeriodSchema = new mongoose.Schema({
    id: Number,
    name: String,
    periodStart: Number,
    periodEnd: Number,
    parentId: Number,
    children: [ChildSchema]
});

registerEvents(PeriodSchema);
export default mongoose.model('Period', PeriodSchema);
