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
  loginInfo: [Schema.Types.Mixed],
});

const userModel = mongoose.model('User', User);
module.exports = userModel;
