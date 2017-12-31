'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var FollowSchema = new Schema({
  user : {type: Schema.ObjectId, ref: 'User'},
  followers: [{ user: {_id: Schema.ObjectId, name: String}}],
  following: [{ user: {_id: Schema.ObjectId, name: String}}]
});

module.exports = mongoose.model('Follow', FollowSchema);
