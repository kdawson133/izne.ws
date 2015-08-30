---
title: Get a Better Browser in Elementary OS
author: 'Kirk'
tags: [elementary, chromium, firefox, midori, tools]
categories: [Linux]
description: How to install Chrome or Firefox and remove Midori in Elementary OS.
header: /assets/img/linux.jpg
---

If your a keen web developer like me you probably want to test your sites with a few other browsers besides the default one in Elementary, Midori. Even if you are not a developer you may prefer another and i'm going to show you how.

## Install Firefox

Now to installing our new browser, in our terminal:

    sudo apt-get update
    sudo apt-get install firefox
Your done.

## Install Chrome

If you want to install chrome as well, in our terminal:

    sudo apt-get update
    sudo apt-get install chromium-browser
Your done.

## Remove Midori (Optional)

Open up a terminal and type the following commands:

     sudo apt-get purge midori-granite
     sudo apt-get autoremove

## Setting Your default Browser

If you didn't remove Midori and you want to make either Firefox or Chrome your default browser:

* Click on Applications (slingshot)
* Click on System Settings
* Click on Applications
* Click on the Web Browser Drop Down and choose your default browser.

Too Easy!
