'use strict';

const mongoose = require('mongoose');

const commentSchema = mongoose.Schema({
  ad_Id: String,
  username: String,
  comment: String,
  createdAt: String,
});

commentSchema.statics.list = function (filter, limit, sort) {
  console.log(filter)
  const query = Comment.find(filter);
  query.limit(limit);
  query.sort(sort)

  return query.exec();
}

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;