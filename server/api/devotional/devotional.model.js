'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var DevotionalSchema = new Schema({
  day: Number,
  book: String,
  chapter: Number,
  verses: String,
  user: {type: Schema.ObjectId, ref: 'User'},
  comment: {type: Schema.ObjectId, ref: 'Comment'},
});

module.exports = mongoose.model('Devotional', DevotionalSchema);
