/*
 * index.js
 * Copyright (C) 2017 disoul <disoul@DiSouldeMacBook-Pro.local>
 *
 * Distributed under terms of the MIT license.
 */
chrome.runtime.onMessage.addListener(function(msg, sender, res) {
  alert('msg', msg);
});

alert('233');
