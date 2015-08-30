---
title: Apache Virtual Hosts
author: 'Kirk'
tags: [apache, server, virtual-hosts, development]
categories: [OSX]
description: How to setup and configure Virtual Hosts with Apache on OS X 10.9 Mavericks.
header: /assets/img/osx.jpg
---

Setting up Virtual Hosts with Apache on Mac OSX 10.9 Mavericks or Mountain Lion is quite straight forward if you have your local Web Development environment up and running - get your web development up and running first following the AMP stack guide [here](/archive/2014/07/19/Develpoment-Server) if required.

The process of setting up Virtual Hosts is easier in the Terminal by either using __nano__ or __vi__ with __sudo__ or as a __root__ user, or you can use a GUI visual editor like __[Atom](http://atom.io)__ which allows access to the `/private/etc` directory by pressing __command + option + .__ in the open dialog box.


### Allow the vhosts configuration from the Apache configuration file httpd.conf

    sudo nano /etc/apache2/httpd.conf

### Search for 'vhosts' and uncomment the include line


    # Virtual hosts

    Include /private/etc/apache2/extra/httpd-vhosts.conf

This will allow usage of the __httpd-vhosts.conf__ file, open this file to add in the vhost.

    sudo nano /etc/apache2/extra/httpd-vhosts.conf

An example is given in the file of the format required to add additional domains, just follow this to create your new virtual host:

    <VirtualHost *:80>
      ServerAdmin webmaster@dummy-host2.example.com
      DocumentRoot "/usr/docs/dummy-host2.example.com"
      ServerName dummy-host2.example.com
      ErrorLog "/private/var/log/apache2/dummy-host2.example.com-error_log"
      CustomLog "/private/var/log/apache2/dummy-host2.example.com-access_log" common
    </VirtualHost>

We can take this example and extend on it, if you wanted a domain named apple.com for example, you can copy the existing text block and edit to suit:

    <VirtualHost *:80>

      ServerName apple.com

      ServerAlias www.apple.com

      DocumentRoot "/Users/username/Sites/apple"

      ErrorLog "/private/var/log/apache2/apple.com-error_log"

      CustomLog "/private/var/log/apache2/apple.com-access_log" common

      ServerAdmin neilgee@coolestguidesontheplanet.com

        <Directory "/Users/neilg/Sites/apple">

            Options Indexes FollowSymLinks

            AllowOverride All

            Order allow,deny

            Allow from all

        </Directory>

    </VirtualHost>

So here I am creating a vhost for apple.com and making the document root in my __Sites__ folder, in the text block above I have also added in some directory permissions and a server alias to also use the 'www' prefix, what you need to change is the document root location, email address and domain name to suit your needs. Finish and save the file.

One of the better workflows is to create a 'Sites' folder and store your vhosts in it – but now also you need to spoof the IP address to be the local one, the set up of these using the __User/Sites__ folder is outlined in the links [above](/archive/2014/07/19/Develpoment-Server) for the initial AMP stack guides.

## Spoof Your IP address to the Domain

    sudo nano /etc/hosts

Add the Domain to resolve to the local address

    127.0.0.1 apple.com
    127.0.0.1 www.apple.com

## Restart Apache

    sudo apachectl restart

Check out your local vhost domain in the browser

## Losing Localhost

One thing to note about virtual hosts is that once set up, you lose your older document root previously at __/LIbrary/WebServer/Documents__ or accessed in the browser at __http://localhost__ what happens is that you get a 403 Forbidden Error. But the __~/username__ document root is still compatible.

To get around this, you need to add in a vhost for localhost and declare this vhost before any of the others, in the same file:

    sudo nano /etc/apache2/extra/httpd-vhosts.conf

Add in:

    <VirtualHost *:80>
      ServerName localhost
      DocumentRoot /Library/WebServer/Documents/
    </VirtualHost>

Then restart Apache and all should be good.
