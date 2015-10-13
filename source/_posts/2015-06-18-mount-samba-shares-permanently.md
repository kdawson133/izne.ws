---
title: Mount Samba Shares
author: 'Kirk'
tags: [elementary, ubuntu, debian, network, samba]
categories: [Linux]
description: Mount Samba Shares Permanently in Elementary OS.
header: /assets/img/linux.jpg
highlight: true
---

## Prerequisites:

* Network connections have been configured properly.
* Your local (Elementary) username is **elementaryusername**.
* Share username on the Samba Server computer is **sambausername**.
* Share password on the Samba Server computer is **sambapassword**.
* The Samba Server computer's name is **servername**.
  * (this can be either an IP address or an assigned name).
* The name of the share is **sharename**.
* You want to mount the share in **`/media/sharename`**.

## CIFS Installation

    sudo apt-get install cifs-utils

## Mounting Unprotected (guest) Network Folders

First, let's create the mount directory. You will need a separate directory for each mount.

    sudo mkdir /media/sambashare

Then edit your `/etc/fstab` file (with root privileges) to add this line:

```
//servername/sharename  /media/sambashare  cifs  guest,uid=1000,iocharset=utf8  0  0

```

Where;

* **guest** indicates you don't need a password to access the share.
* **uid=1000** makes the Linux user specified by the id the owner of the mounted share, allowing them to rename files.
* **iocharset=utf8** allows access to files with names in non-English languages. This doesn't work with shares of devices like the Buffalo Tera Station, or Windows machines that export their shares using ISO8895-15.
* If there is any ***space in the server path***, you need to replace it by `\040`, for example: `//servername/My\040Documents`

After you add the entry to `/etc/fstab` type:

```
sudo mount -a

```

This will (re)mount all entries listed in `/etc/fstab`.

## Mount Password Protected Network Folders

The quickest way to auto-mounting a password-protected share is to edit `/etc/fstab` (with root privileges), to add this line:

```
//servername/sharename  /media/sambashare  cifs  username=sambausername,password=sambapassword,users,iocharset=utf8,sec=ntlm  0  0

```

This is not a good idea however: `/etc/fstab` is readable by everyone and so is your Samba password in it. The way around this is to use a credentials file. This is a file that contains just the username and password.

***NOTE***: The `users` option allows anyone in the group users (everyone) to unmount and remount this share inside the Pantheon file manager.

Using a text editor, create a file for your remote servers logon credential:

```
nano ~/.smbcredentials

```

Enter your Samba username and password in the file:

```
username=sambausername
password=sambapassword
```

Save the file, exit the editor.

Change the permissions of the file to prevent unwanted access to your credentials:

    chmod 600 ~/.smbcredentials

Then edit your `/etc/fstab` file (with root privileges) to add this line (replacing the insecure line in the example above, if you added it):

```
//servername/sharename /media/sambashare cifs credentials=/home/elementaryusername/.smbcredentials,users,iocharset=utf8,sec=ntlm 0 0

```

Save the file, exit the editor.

Finally, test the *fstab* entry by issuing:

    sudo mount -a

If there are no errors, you should test how it works after a reboot. Your remote share should mount automatically.

## Special Permissions

If you need special permission (like chmod etc.), you'll need to add a uid (short for 'user id') or gid (for 'group id') parameter to the share's mount options.

```
//servername/sharename  /media/sambashare  cifs   uid=elementaryusernameuser,credentials=/home/elementaryusername/.smbcredentials,iocharset=utf8,sec=ntlm   0       0
```
