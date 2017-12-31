'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var FeedSchema = new Schema({
  owner: {type: Schema.ObjectId, ref: 'User'},
//  user: {type: Schema.ObjectId, ref: 'User'},
  entries: [
            {
            	_id : Schema.ObjectId,
            	user : { _id: Schema.ObjectId, name: String},
            	date : Date,
            	comment: { group : {type: Schema.ObjectId, ref: 'Group'}, text : String},
            	media: {url: String, name: String, description: String,type: String,image: {type: Schema.ObjectId, ref: 'Image'}},
            	reference: {url: String, description: String},
            	likes: Number,
            	remarks: [{type: Schema.ObjectId, ref: 'Remark'}],
            	isPrivate: Boolean
            }],
  date: {type: Date, default: Date.now}
});

FeedSchema.index({owner:1});

module.exports = mongoose.model('Feed', FeedSchema);
