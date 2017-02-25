/*
 * index.js
 * Copyright (C) 2017 disoul <disoul@DiSouldeMacBook-Pro.local>
 *
 * Distributed under terms of the MIT license.
 */
import loginTemplate from './login.template.js';
import getIndexHTML from './index.template.js';
import store from 'store';

const host = 'http://127.0.0.1:4000'

const sendLoginInfo() => {
  let info = store.get('info');
  
  chrome.tabs.query({
    active: true,
    currentWindow: true
  }, function (tabs) {
    chrome.tabs.sendMessage(
      tabs[0].id,
      {from: 'popup', payload: info},
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
      store.set('info', JSON.stringify(data.info));
      store.set('token', data.token);
      store.set('user', data.user);

      let html = getIndexHTML(data.user);
      $('#app').empty();
      $('#app').append(html);
    }).catch(e => {
      alert('登录失败', e.toString);
    })
  })
}

$(document).ready(() => {
  let userToken = store.get('token');
  let user = store.get('user');
  if (!userToken || !user) {
    initLogin();
  } else {
    let html = getIndexHTML(user);
    $('#app').append(html);
  }

})

