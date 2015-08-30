---
title: Properly Merge Folders on a Mac
author: 'Kirk'
tags: [ditto, development, tools]
categories: [OSX]
description: Using the ditto command to properly merge folders in OSX.
header: /assets/img/osx.jpg
---
Merging folders on a Mac is usually troublesome to say the least. When you do it, Finder tries to overwrite any file with the same name with the newer version. That means it’s easy to accidentally erase a whole folder. This method is a better way to merge folders using Terminal.

If you want to merge folders properly use the `ditto` command in Terminal. For example:

    ditto ~/Desktop/Test ~/Downloads/Test

This will merge the **Downloads/Test** folder with the **Desktop/Test folder**, overwriting the contents of the destination folder with files from the source folder, while still keeping anything that’s different. You can also do this by option-clicking a folder and dragging and dropping it, but it doesn’t work as well. If you’ve been frustrated by Finder’s inconsistent merge options, `ditto` should do the trick.
