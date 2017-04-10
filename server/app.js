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
const jwt = require('jsonwebtoken');

const userModel = require('./model/user').userModel;
const infoModel = require('./model/user').infoModel;

const AES = require("crypto-js/aes");

app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('hello!');
});

// 登录认证中间件
// 所有/api的请求都需要进行用户认证
app.all('/api/*', auth);

app.post('/api/info', async(req, res) => {
  try {
    let user = await userModel.findOne({user: req.auth.user});
    req.body.user = user.user;
    // 使用AES加密用户密码信息，第二个参数为密钥
    req.body.passwordValue = AES.enctypt(req.body.passwordValue, 'secretkeyisme!@#');
    let doc = await infoModel.findOneAndUpdate(
      { user: req.body.user, path: req.body.path },
      req.body,
      { upsert: true }
    );
    let info = await infoModel.find({user: req.body.user});

    res.status(200).send({info: info});
  } catch(e) {
    res.status(500).send({error: e.toString()});
  }
});

// 用户注册
app.post('/signup', async (req, res) => {
  let userInfo = {
    user: req.body.user,
    // 对服务器密码做md5加密保存
    password: md5(req.body.password),
  }
  let user = new userModel(userInfo);
  try {
    await user.save();
    res.status(200).send({status: 'ok'});
  } catch(e) {
    res.status(500).send({error: e.toString()});
  }
});

app.post('/login', async (req, res) => {
  try {
    let user = await userModel.findOne({user: req.body.user});
    // 密码md5后符合，登录成功
    if (user.password === md5(req.body.password)) {

      // 签发认证token给用户
      let token = jwt.sign(
        {
          user: req.body.user,
          t: Date.now,
        },
        // token 密钥
        'ilovenagisa',
        // token 有效期
        {
          expiresIn: '10d',
        }
      );
      let loginInfo = await infoModel.find({user: user.user});
      res.status(200).send({info: loginInfo, token: token, user: user.user});
    } else {
      res.status(403).send({error: 'password error'});
    }
  } catch(e) {
    res.status(400).send({error: e.toString()});
  }
})


app.listen(process.env.PORT || 4000, () => {
  console.log('server listening on port', process.env.PORT || 4000);
})
