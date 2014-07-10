'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ChildSchema = new Schema({
	id: Number,
	name: String,
	parentId: Number
});

var MaterialSchema = new Schema({
	id: Number,
	name: String,
	parentId: Number,
	children: [ChildSchema]
});

mongoose.model('Material', MaterialSchema);
