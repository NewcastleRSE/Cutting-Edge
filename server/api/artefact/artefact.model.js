'use strict';

import mongoose from 'mongoose';
import {registerEvents} from './artefact.events';

var Category = {
    id: Number,
    name: String
};

var Location = {
    id: Number,
    type: { type: String },
    title: String,
    subtitle: String,
    location: {
        type: { type: String },
        coordinates: [Number]
    },
    accuracy: Number
};

var PeriodSchema = new mongoose.Schema({
    id: Number,
    name: String,
    periodStart: Number,
    periodEnd: Number,
    parentId: Number
});

var MaterialSchema = new mongoose.Schema({
    id: Number,
    name: String,
    parentId: Number
});

var ReferenceSchema = new mongoose.Schema({
    type: { type: String },
    contents: String,
    id: Number,
    artefactId: Number
});

var ArtefactSchema = new mongoose.Schema({
    id: Number,
    accession: String,
    simpleName: String,
    dimensions: String,
    thumbnail: String,
    storageDescriptor: String,
    description: String,
    categoryId: Number,
    findLocationId: Number,
    storeLocationId: Number,
    category: Category,
    findLocation: Location,
    currentLocation: Location,
    periods: [PeriodSchema],
    materials: [MaterialSchema],
    references: [ReferenceSchema]
});

registerEvents(ArtefactSchema);
export default mongoose.model('Artefact', ArtefactSchema);
