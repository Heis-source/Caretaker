'use strict';

const mongoose = require('mongoose');

const commentSchema = mongoose.Schema({
  ad_Id: String,
  username: String,
  comment: String,
  createdAt: String,
});

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;