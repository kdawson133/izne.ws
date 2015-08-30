---
title: Swap Out a Defective Home Partition Hard Drive
description: What to do if you have a Linux install With Your Home Partition on a Separate Drive and It Dies
author: 'Kirk'
categories: [Linux]
tags: [repair, partition]
header: /assets/img/linux.jpg
---

___WARNING:___ Don't try this unless you understand what you are doing. You may end up with an unusable system.

I recently had a bit of drama when I booted up my trusty Linux box. I had a warning that the S.M.A.R.T status of my home partition drive was on it's way out and that I should backup and replace. So, after a bit of research, I figured out what to do and it worked right out of the box. So I thought I can't be the only one to face this dilemma and I will now share what I did to overcome this situation.

## Step One - Install Your Replacement Drive

At this point you need to physically install your new drive into your box leaving the old one in situ for the time being.

Once you have completed that boot up your machine.

It's now that you format the drive (I used ext4 for my filesystem).
You will need to know which device you will formatting, so at the terminal enter the following:

    lsblk

You will get a listing of all your devices, note the one without any partitions. In this example I'll use `/dev/sdx` replace the 'x' with the appropriate to your situation.

Partition the disk by:

    sudo fdisk /dev/sdx

Then press `N` to add a new partition, and then accept all the default choices.
Then when you are presented with the fdisk menu press `w` write table to disk and exit.

Format the disk by:

    sudo mkfs.ext4 /dev/sdx1

Create a mount point by:

    sudo mkdir -p /media/home

Mount the disk by:

    sudo mount /dev/sdx1 /media/home

## Step Two - Copy Your files

This is the part where we copy all the files from your current home partion to the new one. Enter the following command:

    sudo cp -Rp /home/* /media/home

## Step Three - Modify Your FSTAB

Firstly we need the the UUID for the new drive:

      sudo blkid

This will give you a listing of all your block storage devices and their UUID's

Take careful not of the UUID for your new drive, you will need it in the next step.

Now to actually modify the FSTAB (File System Allocation Table). enter the command:

    sudo nano /etc/FSTAB

This will open the file in the nano editor. you can use any editor you want.

Modify the entry for the home partition with this ___using the carefully noted UUID from the previous step___:

    UUID=2e9f54c3-1319-4ee0-9e21-142df7272c88  /home ext4  defaults  02

Once you have done that save and exit. On nano it's done with a `ctrl-x` and following the prompts.

## Step Four - Shutdown then Reboot

Now comes the fun part. Poweroff your machine. Remove the defective drive. Boot the machine once more and Violla! your done.
