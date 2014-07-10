'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ChildSchema = new Schema({
	id: Number,
	name: String,
	periodStart: Number,
	periodEnd: Number,
	parentId: Number
});

var PeriodSchema = new Schema({
	id: Number,
	name: String,
	periodStart: Number,
	periodEnd: Number,
	parentId: Number,
	children: [ChildSchema]
});

mongoose.model('Period', PeriodSchema);