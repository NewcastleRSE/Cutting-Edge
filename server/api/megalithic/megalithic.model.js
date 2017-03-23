'use strict';

import mongoose from 'mongoose';
import {registerEvents} from './megalithic.events';

var MegalithicSchema = new mongoose.Schema({
    id: Number,
    name: String,
    source: String,
    type: String,
    location: {
        type: {
            type: String,
            enum: 'Point',
            default: 'Point'
        },
        coordinates: [Number]
    },
    siteCondition: Number,
    access: Number,
    alternativeNames: String,
    image: String,
    region: String
});

MegalithicSchema.index({location: '2dsphere'});

registerEvents(MegalithicSchema);
export default mongoose.model('Megalithic', MegalithicSchema);
