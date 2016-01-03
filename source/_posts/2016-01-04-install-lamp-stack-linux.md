---
title: Install Local Development Server on Elementary
description: How to install the LAMP STACK on Elementary OS.
author: 'Kirk'
categories: [Linux]
tags: [elementary, tools, lamp, server]
header: /assets/img/linux.jpg
highlight: true
---
# Install a Local Development Server

Elementary does not include this by default, and as a front-end developer you will need to preview your handy work before publishing it to the web.

So here is the procedure to install the LAMP stack on your local machine.

__LAMP__ stands for:

* __A__ pache - The Web Server.
* __M__ ySQL - The Database Server.
* __P__ HP - A Server-Side scripting language.

## Step One

The first step is to update the system:

    sudo apt-get update && sudo apt-get upgrade

## Step Two

Then we install LAMP Server:

    sudo apt-get install lamp-server^

Type your password. Agree to the packages it’ll install. This will install __ALL__ of the packages you’ll need to run a web server locally.

The packages installed are as follows:

> apache2 apache2-bin apache2-data apache2-mpm-prefork libaio1 libapache2-mod-php5
libapr1 libaprutil1 libaprutil1-dbd-sqlite3 libaprutil1-ldap libdbd-mysql-perl
libdbi-perl libhtml-template-perl libmysqlclient18 libterm-readkey-perl
mysql-client-5.5 mysql-client-core-5.5 mysql-server mysql-server-5.5
mysql-server-core-5.5 php5-cli php5-common php5-json php5-mysql php5-readline

You will need to enter a password for the root user of MySQL, make sure you take note of it, you will need it later on.

## Step Three

Let’s test that by going to `http://localhost/` in the browser. You should get a success apache screen.

Let's now test PHP:

    sudo touch /var/www/html/info.php

	sudo nano /var/www/html/info.php

Enter the following code:

	<?php phpinfo(); ?>

Enter `Ctrl-X` to exit and enter y and return to save. Then navigate to `http://localhost/info.php` in your browser and you should see the phpinfo screen.

## Step Four

Setup MySQL by issuing the following command:

	sudo /usr/bin/mysql_secure_installation

Enter the password you set earlier and follow the prompts and enter for the default values, which are pretty safe. You do not need to change your password again.
