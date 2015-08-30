---
title: Setting Up Passwordless SSH
author: 'Kirk'
tags: [ssh, server, development]
categories: [OSX, Linux]
description: How to set up ssh so you can log in to a remote server without a password using public key encryption.

---
Setting up passwordless SSH logins is a great way to speed up your workflow when regularly connecting to a remote host like using [rsync](https://en.wikipedia.org/wiki/Rsync) over ssh. OS X does not include the `ssh-copy-id` command and so we will have to find another way. This is how to do it and it doesn't take very long.

## Generate a Key

Skip this step if you already have done this previously. you can check by issuing the following command in the terminal:

    cat ~/.ssh/id_rsa.pub

If you see some thing like:

    ssh-rsa AAAAB3NzaC1yc2EAAAADAQAB.....iQ== username@hostname

You already have a key and you can move on to the next step, other wise you can generate a key as follows:

    ssh-keygen

That's it you have generated your key.

## Transfer the Public Key to the Remote Host

The first thing you need to do is logon to the remote host and check whether is has a `.ssh` directory for the user you are logging in as so in the terminal:

    ssh username@remotehost

Enter the password and you are logged in as long as the user has an account and you got the password correct. check for the directory by:

    cd .ssh

If that works you can logout otherwise you need to create the directory:

    mkdir .ssh

Now logout using the `exit` command and now we can transfer the key we made earlier by:

    cat ~/.ssh/id_rsa.pub | ssh user@remotehost 'cat >> ~/.ssh/authorized_keys'

you will need to enter your password again. Now try logging in to the remote server again to confirm it's worked:

    ssh username@remotehost

If all went well you didn't need to enter a password.
