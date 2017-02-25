/*
 * fuse.config.js
 * Copyright (C) 2017 disoul <disoul@DiSouldeMacBook-Pro.local>
 *
 * Distributed under terms of the MIT license.
 */
const fsbx = require('fuse-box')

const FuseBox = new fsbx.FuseBox({
  homeDir: "./script/content",
  outFile: "./build/content.js",
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
