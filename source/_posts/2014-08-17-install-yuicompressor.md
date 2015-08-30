---
title: Install YUI Compressor on OSX
author: 'Kirk'
tags: [yui-compressor, minify, css, javascript, development]
categories: [OSX]
description: Install Yahoo's YUI compressor and use it in the terminal.
header: /assets/img/osx.jpg
---
I have been searching for a simple command line utility to minify my `.js` and `.css`
files to get faster loads on my static sites. Most of the available applications are for
on-the-fly conversion on a webserver. This is not much use if you just want to minify your
files before deployment.

Any way [YUI Compressor](http://yui.github.io/yuicompressor/) is available through
[homebrew](http://brew.sh). So to install open up your terminal and issue the command:

    brew install yuicompressor

After it is installed you can use it at the command line. It can minify 1 or more files
you pass as arguments and output to the screen. if you pass output to file you can do it
like so:

For a CSS file:

    yuicompressor test.css > test.min.css
For a JS file:

    yuicompressor test.js > test.min.js

Too Easy :)
