'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var CategorySchema = new Schema({
    name: String,
    id: Number
});

mongoose.model('Category', CategorySchema);
