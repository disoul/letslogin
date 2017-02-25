/*
 * background.js
 * Copyright (C) 2017 disoul <disoul@DiSouldeMacBook-Pro.local>
 *
 * Distributed under terms of the MIT license.
 */
let loginInfos = [];

chrome.runtime.onMessage.addListener((msg, sender, res) => {
  msg.payload.forEach(function(info) {
    if (info.path === location.origin + location.pathname) {
      loginInfos.push(info);
    }

    autoFill();
  })
  res('content ok');
});

function autoFill() {

}

$('docuemnt').ready(function() {

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
      console.log(this, currentForm);
      //TODO: fetch
    });
  });
})
