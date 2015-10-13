---
title: Install Banshee Music Player
author: 'Kirk'
tags: [elementary, banshee, apps]
categories: [Linux]
description: Install the Banshee Music Player in Elementary OS.
header: /assets/img/linux.jpg
highlight: true
---

As you may know, Banshee is an open source music player, developed by Novell. For encoding and decoding, it uses the GStreamer library. The latest version available is Banshee 2.9.0.

In this article I will show you how to install Banshee 2.9.0 on elementary OS or any ubuntu/debian derivative.

It will be soon added to the Banshee Official PPA, so installing it is easy. Just add the ppa to your system, update the local repository index and install the banshee package. Like this:

    $ sudo add-apt-repository ppa:banshee-team/ppa

    $ sudo apt-get update

    $ sudo apt-get install banshee

Viola!
