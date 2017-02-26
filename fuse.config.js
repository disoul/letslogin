/*
 * fuse.config.js
 * Copyright (C) 2017 disoul <disoul@DiSouldeMacBook-Pro.local>
 *
 * Distributed under terms of the MIT license.
 */
const fsbx = require('fuse-box')

const homeDir = process.env.HOME === 'popup' ? './app/script/popup' : './app/script/content/';
const outFile = process.env.HOME === 'popup' ? 'popup.js' : 'content.js';

const FuseBox = new fsbx.FuseBox({
  homeDir: homeDir,
  outFile: "./app/build/" + outFile,
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

FuseBox.bundle(">index.js");
