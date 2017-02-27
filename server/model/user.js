/*
 * user.js
 * Copyright (C) 2017 disoul <disoul@DiSouldeMacBook-Pro.local>
 *
 * Distributed under terms of the MIT license.
 */

const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/letslogin');

const Schema = mongoose.Schema;

const User = new Schema({
  user: { type: String, unique: true },
  password: String,
});

const LoginInfo = new Schema({
  user: String,
  path: String,
  userSelector: String,
  userValue: String,
  passwordSelector: String,
  passwordValue: String,
});

const userModel = mongoose.model('User', User);
const infoModel = mongoose.model('loginInfo', LoginInfo);
module.exports = {
  userModel,
  infoModel,
};
