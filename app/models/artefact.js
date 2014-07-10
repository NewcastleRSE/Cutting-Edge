'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

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

var PeriodSchema = new Schema({
	id: Number,
	name: String,
	periodStart: Number,
	periodEnd: Number,
	parentId: Number
});

var MaterialSchema = new Schema({
	id: Number,
	name: String,
	parentId: Number
});

var ReferenceSchema = new Schema({
	type: { type: String },
	contents: String,
	id: Number,
	artefactId: Number
});

var ArtefactSchema = new Schema({
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

mongoose.model('Artefact', ArtefactSchema);
