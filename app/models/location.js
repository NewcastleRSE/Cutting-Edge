'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var LocationSchema = new Schema({
	id: Number,
	type: String,
    name: String,
    location: String,
    accuracy: Number,
    latitude: Number,
    longitude: Number
});

mongoose.model('Location', LocationSchema);
