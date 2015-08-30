---
layout: post
title: Hide All Your Desktop Icons on Mac OSX
author: 'Kirk'
tags: [finder, desktop, icons]
categories: [OSX]
description: How to hide and unhide the desktop on OSX.
header: /assets/img/osx.jpg
---

Desktop icon clutter can really impact workflow by overwhelming you with files and just too much stuff to look at. Inevitably, it can be hard to avoid since a lot of apps download things to the Desktop by default, we save things there, screenshots go there, it quickly becomes the generic catch-all location for documents and stuff that we’re working with. If you decide the desktop is just too much to deal with, you can actually toggle a secret setting in Mac OS X to turn off the desktop icons, thereby preventing them from being displayed at all.

## Hide Desktop Icons from Appearing

Launch Terminal, found within `/Applications/Utilities`, and type the following defaults command string:

    defaults write com.apple.finder CreateDesktop -bool false

After hitting enter, you will then need to kill the Finder so that it relaunches and the changes take effect:

    killall Finder

The desktop will no longer display icons, effectively hiding them from appearing. All of the files still exist, but they’re now discretely hidden in your home folder’s “Desktop” directory rather than cluttering up the visible desktop. If you’re wondering what this looks like when it’s in effect, it’s basically a super-clean desktop like this:

![Desktop icons disabled in OS X](/images/desktop-after.jpg)

Notice how there is literally nothing on the desktop? Just a clean image of the background wallpaper? That’s what this trick does.

Note that this process is different than simply hiding things like Mac hard drive icons and network shares from showing up on desktop, because this trick is all inclusive and hides every single icon regardless of what it is, completely preventing them from appearing on the OS X Desktop whatsoever, despite still technically being stored in the users ~/Desktop directory. It’s obviously easy to implement, and it’s also easy to reverse if you decide the feature isn’t for you and you want to see everything visible as usual again.

## Show Desktop Icons Again in Mac OS X

To show the Desktop icons again, open the Mac Terminal and type the following defaults command, notice the only difference is ‘false’ has been turned into ‘true’, thereby re-enabling desktop icon display:

    defaults write com.apple.finder CreateDesktop -bool true

Again, kill the Finder and your icons will show on the desktop as usual:

    killall Finder

Finder will relaunch, and the desktop will be revealed again with all of it’s icons shown. The image below shows an exaggerated example, with tons and tons of icons sitting on the wallpaper:

![Desktop cluttered with lots of icons, desktop is visible](/images/desktop-before.jpg)

Other than being a nuisance to look at, desktop clutter can actually slow down a Mac (or any computer, for that matter), since each individual icon and thumbnail must be drawn by the operating system anytime the desktop is accessed or shown. As a result, every single file sitting on the desktop takes up a little slice of memory, and redrawing the thumbnail icons uses a tiny bit of CPU, but with hundreds of files laying about those will accumulate to a significant burden on the computers resources, thereby slowing down the computer. This is particularly true with old Macs, but it applies to newer models as well. So when in doubt, keep it tidy and free of too many icons, or just hide the icons display like we described here so that you can gain a temporary speed boost until you sort through your files.
