---
title: Install Atom Editor
author: 'Kirk'
tags: [elementary, atom, scratch, tools]
categories: [Linux]
description: Install Atom Editor in Elementary OS.
header: /assets/img/linux.jpg
---

I have been a great fan of the [Atom Editor](https://atom.io/), which is an open-source editor from our friends over at [github](https://github.com/).

When I swapped to [Elementary](http://elementary.io/) recently, I had to find a replacement for the included Scratch text editor and decided to continue using Atom.

## Installing Atom

Open a terminal and using the following commands (entering your password when prompted):

```
sudo add-apt-repository ppa:webupd8team/atom
sudo apt-get update
sudo apt-get install atom
```
... and thats all, it will now show up in slingshot.

## Remove Scratch (Optional)

```
sudo apt-get purge scratch-text-editor
```

## Setting Your default Editor

If you didn't remove Scratch and you want to make Atom your default editor:

* Click on Applications (slingshot)
* Click on System Settings
* Click on Applications
* Click on the Text Editor Drop Down and choose your default editor.

That is all.
