'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ReferenceSchema = new Schema({
	url: String,
	description: String,
	date: {type: Date, default: Date.now},
	user: { type: Schema.ObjectId, ref: 'User'}
});

module.exports = mongoose.model('Reference', ReferenceSchema);