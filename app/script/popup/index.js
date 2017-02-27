/*
 * index.js
 * Copyright (C) 2017 disoul <disoul@DiSouldeMacBook-Pro.local>
 *
 * Distributed under terms of the MIT license.
 */
import loginTemplate from './login.template.js';
import getIndexHTML from './index.template.js';
import $ from 'jquery';

const host = 'https://letslogin.disoul.me'

const promiseify = (f) => () => new Promise((resolve, reject) => {
  f
})

const sendLoginInfo = () => {
  let info = chrome.storage.sync.get('info');
  
  chrome.tabs.query({
    active: true,
    currentWindow: true
  }, function (tabs) {
    let token = chrome.storage.sync.get('token');
    chrome.tabs.sendMessage(
      tabs[0].id,
      {from: 'popup', payload: {info: JSON.parse(info), token: token}},
      function(res) {
        console.log('sdsadasd', res);
      }
    );
  });
}

const initLogin = () => {
  $('#app').append(loginTemplate);

  $('#login').submit(e => {
    e.preventDefault();
    
    fetch(host + '/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user: $('#user')[0].value,
        password: $('#password')[0].value,
      })
    }).then(res => res.json()).then(data => {
      if (data.error) {
        throw new Error(data.error);
      }
      //TODO: emit with content script

      chrome.storage.local.set({
        info: data.info,
        token: data.token,
        user: data.user,
      });

      let html = getIndexHTML(data.user);
      $('#app').empty();
      $('#app').append(html);
      $('#logout').click(() => {
        chrome.storage.local.clear();
      })
    }).catch(e => {
      console.log(e);
      alert('登录失败', e.toString);
    })
  })
}

$(document).ready(() => {
  let userToken;
  let user;
  chrome.storage.local.get(['token', 'user'], function(data) {
    console.log(data);
    userToken = data.token;
    user = data.user;
    if (!userToken || !user) {
      initLogin();
    } else {
      let html = getIndexHTML(user);
      $('#app').append(html);
      $('#logout').click(() => {
        chrome.storage.local.clear();
      })
      //sendLoginInfo();
    }
  });

})

