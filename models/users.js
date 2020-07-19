'use strict';

const mongoose = require('mongoose');

const usersSchema = mongoose.Schema({
  email: { type: String, unique: true },
  password: String,
  username: String,
  biography: String,
  state: String,
  photo: String,
  thumb: String,
  token: String,
  resetPasswordToken: String,
  resetPasswordExpire: String,
  showemail: Boolean,
  rating: String,
});

const Users = mongoose.model('Users', usersSchema);

module.exports = Users;