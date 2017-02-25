/*
 * fuse.config.js
 * Copyright (C) 2017 disoul <disoul@DiSouldeMacBook-Pro.local>
 *
 * Distributed under terms of the MIT license.
 */
const fsbx = require('fuse-box')

const FuseBox = new fsbx.FuseBox({
  homeDir: "./app/script/popup/",
  outFile: "./app/build/popup.js",
  cache: true, // default
  
  plugins: [
    fsbx.CSSPlugin(),
    fsbx.BabelPlugin()
  ],

  autoImport: {
    $: 'jquery',
  },

  alias: {

  },
});

FuseBox.bundle(">popup.js");
