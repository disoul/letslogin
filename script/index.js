/*
 * index.js
 * Copyright (C) 2017 disoul <disoul@DiSouldeMacBook-Pro.local>
 *
 * Distributed under terms of the MIT license.
 */
(function(){
  'use strict';
  
  console.log('??');

  chrome.windows.getCurrent(function(window) {
    console.log(window);
  })
})();
