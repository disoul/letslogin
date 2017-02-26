/*
 * auth.js
 * Copyright (C) 2017 disoul <disoul@DiSouldeMacBook-Pro.local>
 *
 * Distributed under terms of the MIT license.
 */
const jwt = require('jsonwebtoken');

// 登录认证中间件，使用jwt加密认证
function auth(req, res, next) {
  console.log('auth', req.body);
  let token = req.get('Authorization');

  if (!token) {
    res.status(403).send({error: 'no token'});
    return;
  }

  let payload = jwt.decode(token);

  try {
    let decode = jwt.verify(
      token,
      'ilovenagisa'
    );
    req.auth = {};
    req.auth.user = payload.user;
  } catch(err) {
    switch (err.name) {
      case 'TokenExpiredError':
        res.status(403).json({error: 'token expiredError'});
        break;
      case 'JsonWebTokenError':
        res.status(403).json({error: 'invalid token'});
        break;
      default:
        res.status(403).json({error: 'token verify error' + err.toString()});
    }
  }


  next();
}

module.exports = auth;
