/*
 * background.js
 * Copyright (C) 2017 disoul <disoul@DiSouldeMacBook-Pro.local>
 *
 * Distributed under terms of the MIT license.
 */
let forms = $('form');
forms.each(function(i) {
  let form = $(this);
  let inputs = form.children('input');

  let currentForm = {
    user: null,
    password: null,
  };
  let lastInputNode = null;

  inputs.change(function() {
    let input = $(this)[0];

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
  });
});
