---
layout: post
title: Enable Trim in Linux
description: Enable trim by using cron on any Debian based Linux distribution.
author: "Kirk"
tags: [elementary, ubuntu, trim, tweaks, hints]
categories: [Linux]
header: /assets/img/linux.jpg
---

TRIM allows your OS to wipe data on an SSD that are no longer considered in use. Without using TRIM your SSD speed will decrease over time. So if you have a SSD that supports TRIM, you should enable it to get the best performance from your SSD.

Even though TRIM is supported by modern Linux Kernel's, it has a high over head and can affect your systems overall performance. It can be just as easily be run once a day and avoid the high overhead.

If you're unsure if your SSD supports TRIM, you can run the following command:

```
sudo hdparm -I /dev/sda | grep "TRIM supported"
```

Where `/dev/sda` is the solid-state drive (it may be `/dev/sdb`, `/dev/sdc`, etc. for you), and the command should return something like this:
```
Data Set Management TRIM supported (limit 8 blocks)
```
(if there's no output, your SSD doesn't support TRIM).  If you don't know what to use here, you can get a list of hard disks and their partitions by using the following command:
```
sudo fdisk -l
```
## Using a daily cron job


Using a daily cron job, your SSD will be trimmed once a day.

To use a daily cron job for TRIM (fstrim), open `/etc/cron.daily/trim` as root in the terminal (`/etc/cron.daily/trim` doesn't exist so this will create the file):
```
sudo nano /etc/cron.daily/trim
```
and paste this:
```
#!/bin/sh
LOG=/var/log/trim.log
echo "*** $(date -R) ***" >> $LOG
fstrim -v / >> $LOG
fstrim -v /home >> $LOG
```

The last two commands in the code above perform the actual trimming for the root (`/`) and home (`/home`) partition and you need to add them here, add the SSD partitions for which you want to enable the daily TRIM job (usually, you must add `/` if the root partition is on the SSD and `/home` if you've set up a separate home partition).

Before saving the file, you can check if the `fstrim` command works:

```
sudo fstrim -v /
```

The output should look similar to this:

```
earthling@mars:~$ sudo fstrim -v /
/: 8158715904 bytes were trimmed
```

Once you've added your SSD partitions, save the file and make it executable using the following command:
```
sudo chmod +x /etc/cron.daily/trim
```

Linux executes the daily cron (we're using anacron, so even if your computer is turned off at that time, the job will still be performed later on) jobs at around 06:25 so each day after that time, you can check the `/var/log/trim.log` log file to see the `fstrim` output.

Happy trimming...
