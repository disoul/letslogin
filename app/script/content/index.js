/*
 * background.js
 * Copyright (C) 2017 disoul <disoul@DiSouldeMacBook-Pro.local>
 *
 * Distributed under terms of the MIT license.
 */
import unique from 'unique-selector';
import $ from 'jquery';

const host = 'http://127.0.0.1:4000'
let loginInfos = [];
let token = '';

chrome.runtime.onMessage.addListener((msg, sender, res) => {
  console.log('get msg', msg);
  msg.payload.info.forEach(function(info) {
    if (info.path === location.origin + location.pathname) {
      loginInfos.push(info);
    }
  })
  token = msg.payload.token;
  autoFill();
  res('content ok');
});

function autoFill() {
  loginInfos.forEach(info => {
    $(info.userSelector).val(info.userValue);
    $(info.passwordSelector).val(info.passwordValue);
  });
}

$(document).ready(function() {

  var forms = $('form');
  console.log('forms', forms);
  forms.each(function(i) {
    var form = $(this);
    console.log('currentform', form);
    var inputs = form.find('input');

    var currentForm = {
      user: null,
      password: null,
    };
    var lastInputNode = null;

    console.log('inputs', inputs);
    inputs.change(function() {
      var input = $(this)[0];
      console.log('change', input);

      // 用户开始更换输入框
      if (lastInputNode !== input) {
        // 如果用户当前切换到的输入框是密码输入框
        if (input.type === 'password') {
          // 将用户上一次输入的内容认为是user字段存入
          currentForm.user = lastInputNode;
          currentForm.password = input;
        }
      } else if (input.type === 'password') {
        currentForm.password = input;
      }

      lastInputNode = input;
      console.log('currentForm', currentForm);
    })

    form.submit(function(e) {
      console.log('submit!');
      console.log(this, currentForm);
      let options = {
        selectorTypes: [ 'ID', 'Class', 'Tag', 'NthChild' ],
      };
      fetch(host + '/api/info', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token,
        },
        body: JSON.stringify({
          path: location.origin + location.pathname,
          userSelector: unique(currentForm.user, options),
          userValue: currentForm.user.value,
          passwordSelector: unique(currentForm.password, options),
          passwordValue: currentForm.password.value,
        })
      }).then(res => res.json()).then(data => {
        if (data.error) {
          throw new Error(data.error);
        }
        console.log('save success');
      }).catch(e => {
        alert("上传失败", e.toString());
      })
    });
  });
})
