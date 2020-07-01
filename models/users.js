'use strict';

const mongoose = require('mongoose');

const usersSchema = mongoose.Schema({
  email: { type: String, unique: true },
  password: String,
  biography: String,
  state: String,
});

const Users = mongoose.model('Users', usersSchema);

module.exports = Users;