---
title: Install Clementine
author: 'Kirk'
tags: [elementary, clementine, apps]
categories: [Linux]
description: How to install the Clementine music player in Elementary OS.
header: /assets/img/linux.jpg
highlight: true
---

I have been playing around with my Elementary install for a couple of weeks so far and I'm very happy with it in general. The included music app Noise although it fits in very well visually it is a little on the the light side as far as features are concerned. So I thought I'd install an old favourite Clementine.

Using good old apt-get from the command line failed to find the clementine package, so after a little research I found a third-party repo that has an up to date version. So here goes, open up a terminal and enter the following commands:

```
sudo add-apt-repository ppa:me-davidsansome/clementine
sudo apt-get update
sudo apt-get install clementine
```
if you want to remove the included music player Noise:

```
sudo apt-get purge noise
```
And that is all, stay tuned for more posts or request something through the  disqus comments below...
