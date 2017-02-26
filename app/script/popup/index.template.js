/*
 * index.template.js
 * Copyright (C) 2017 disoul <disoul@DiSouldeMacBook-Pro.local>
 *
 * Distributed under terms of the MIT license.
 */
export default function getIndexHTML(user) {
  return `
    <p>用户 ${user}已登录</p>
    <button onclick="chrome.storage.local.clear()">登出</button>
  `;
}
