/*
 * app.js
 * Copyright (C) 2017 disoul <disoul@DiSouldeMacBook-Pro.local>
 *
 * Distributed under terms of the MIT license.
 */
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

const auth = require('./utils/auth');
const md5 = require('md5');

const userModel = require('./model/user');

app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('hello!');
});

// 登录认证中间件
// 所有/api的请求都需要进行用户认证
app.all('/api/*', auth);

// 用户注册
app.post('/signup', async (req, res) => {
  let user = new userModel(res.body);
  try {
    await userModel.save(user);
    res.status(201).send();
  } catch(e) {
    res.status(500).send({error: e});
  }
});

app.post('/login', async (req, res) => {
  try {
    let user = await userModel.findOne(req.body.user);
  } catch(e) {
    res.status(400).send({error: e});
  }
})


app.listen(process.env.PORT || 4000, () => {
  console.log('server listening on port', process.env.PORT || 4000);
})
