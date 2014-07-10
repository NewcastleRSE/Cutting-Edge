'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var MegalithicSchema = new Schema({
	id: Number,
	name: String,
	source: String,
	type: String,
    location: {
        type: { type: String },
        coordinates: [Number]
    },
    siteCondition: Number,
    access: Number,
    alternativeNames: String,
    image: String,
    region: String
});

mongoose.model('Megalithic', MegalithicSchema);
