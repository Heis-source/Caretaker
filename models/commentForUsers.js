'use strict';

const mongoose = require('mongoose');

const commentForUserSchema = mongoose.Schema({
  user_Id: String,
  username: String,
  comment: String,
  createdAt: String,
});

commentForUserSchema.statics.list = function (filter, limit, sort) {
  const query = CommentForUser.find(filter);
  query.limit(limit);
  query.sort(sort)

  return query.exec();
}

const CommentForUser = mongoose.model('CommentForUser', commentForUserSchema);

module.exports = CommentForUser;