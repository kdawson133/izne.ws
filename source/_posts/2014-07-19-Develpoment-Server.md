---
title: Setup Apache, MySQL, PHP and phpMyAdmin
author: 'Kirk'
tags: [apache, mysql, php, phpmyadmin, development]
categories: [OSX]
description: Install and configure Apache, MySQL, PHP and phpMyAdmin on OSX.
header: /assets/img/osx.jpg
---

With the new OSX Mavericks being installed faster than any of it's predecessors, getting the __AMP__ stack running on OSX 10.9 Mavericks is still straight forward. This tutorial will go through the process on getting __Apache__, __MySQL__, __PHP__ and __phpMyAdmin__ running on the new Mavericks OS X.

If you had your local development already set up in OSX 10.8 and simply did an upgrade to 10.9, your MySQL, Apache and phpMyAdmin settings should all be good, you just need to enable PHP.

This tutorial sets up the AMP stack in more of a traditional way, to use HomeBrew for MySQL and phpMyAdmin you may also want to look at this [guide](http://coolestguidesontheplanet.com/set-amp-osx-10-9-mavericks-homebrew/).

## Apache / WebSharing

The web sharing option has not made it back in 10.9, which was previously a GUI option in System Preferences back in 10.7, but fear not Apache is installed ready to be switched on.

Apache is pre-installed in the OS and needs to be enabled via the command line – this needs to be done in Terminal which is found at __/Applications/Utilities/Terminal__

For those not familiar with the Terminal, it really isn’t as intimidating as you may think, once launched you are faced with a command prompt waiting for your commands – just type/paste in a command and hit enter, some commands give you no response – it just means the command is done, other commands give you feedback – lets get to it….

to start it:

    sudo apachectl start

to stop it:

    sudo apachectl stop

to restart it

    sudo apachectl restart

To find the Apache version

    httpd -v

The version installed in OSX Mavericks is __Apache/2.2.24__

After starting Apache – test to see if the webserver is working in the browser – http://localhost – you should see the "It Works!" text.

### Document Root

Document root is the location where the files are shared from the file system and is similar to the traditional names of 'public_html’ and 'htdocs’, OSX has historically had 2 web roots one at a system level and one at a user level – you can set both up or just run with one, the user level one allows multiple acounts to have their own web root whilst the system one is global for all users. It seems there is less effort from Apple in continuing with the user level one but it still can be set up with a couple of extra tweaks. It is easier to use the user level one as you don’t have to keep on authenticating as an admin user.

### System Level Web Root

The default system document root is still found at:

__http://localhost/__

The files are shared in the file system at

__/Library/WebServer/Documents/__

### User Level Root

The other web root directory which is missing by default is the '__~/Sites__' folder in the User account. You need to make a '__Sites__' folder at the root level of your account and then it will work. Upgrading from a previous OS X version preserves the Sites folder but removes the ability to web serve from it – this is where you need to add in a '__username.conf__' file.

Create a Sites folder at the account root level.

Check that you have a '__username.conf__' filed under:

    /etc/apache2/users/

If you don’t, which is very likely, then create one named by the short username of the account with the suffix __.conf__, it’s location and permissions/ownership is best tackled by using the Terminal, the text editor 'nano’ would be the best tool to deal with this.

Launch __Terminal__, (Applications/Utilities), and follow the commands below, first one gets you to the right spot, 2nd one cracks open the text editor on the command line (swap '__username__' with your account’s shortname, if you don’t know your account shortname type '__whoami__' the Terminal prompt):

    cd /etc/apache2/users

    sudo nano username.conf

Then add the content below swapping in your '__username__' in the code below:

    <Directory "/Users/username/Sites/">
      Options Indexes MultiViews
      AllowOverride All
      Order allow,deny
      Allow from all
    </Directory>

Permissions on the file should be:

    -rw-r--r--   1 root  wheel  298 Jun 28 16:47 username.conf

__If not__, you need to change it..

    sudo chmod 644 username.conf

Restart Apache for the new file to be read:

    sudo apachectl restart

Then this user level document root will be viewable at:

__http://localhost/~username/__


### Override .htaccess

If you are going to use the document root at __/Library/WebServer/Documents__ it is a good idea to allow any __.htaccess__ files used to override the default settings – this can be accomplished by editing the __httpd.conf__ file at line 217 and setting the __AllowOverride__ to __All__ and then restart Apache. This is already taken care of at the Sites level webroot by following the previous step.

    /etc/apache2/httpd.conf

![][AllowOveride]

## PHP

__PHP 5.4.24__ is loaded in the latest version of OSX 10.9 Mavericks and needs to be turned on by uncommenting a line in the __httpd.conf__ file.

    sudo nano /etc/apache2/httpd.conf

Use "control" + "w"to search within __nano__ and search for 'php' this will land you on the right line then uncomment the line (remove the #):

    LoadModule php5_module libexec/apache2/libphp5.so

Write out and Save using the nano short cut keys at the bottom 'control o' and 'control x'

Reload apache for changes to take effect:

    sudo apachectl restart

To see and test PHP, create a file name it "phpinfo.php" and file it in your document root with the contents below, then view it in a browser.

     <?php phpinfo(); ?>

## MySQL

MySQL is again a missing component in OS X 10.9 and needs to be dowloaded from the [MySQL site](http://dev.mysql.com/downloads/mysql/) use the Mac OS X ver. 10.7 (x86, 64-bit), DMG Archive version (works fine on 10.9).

When downloading you don’t have to sign up, look for __» No thanks, just take me to the downloads!__  - go straight to the download mirrors and download the software from a mirror which is closest to you.

Once downloaded install the __3__ components. You may need to adjust the Security and Privacy System Pref to allow installs of 3rd party apps because of the new security feature of Mountain Lion known as the 'Gatekeeper’, which keeps unscrupulous installer packages at bay.

To get around this without changing the global preferences (better!) right click or command click the __.pkg__ installer to bring up the contextual menu and select open, then you get the warning – then click Open.

![][MySQL.DMG]

Install all 3…

- mysql5.6.xxx.pkg
- MySQLstartupitem.pkg
- MySQLPrefPane

![][installPrefPane]

The first is the MySQL software, the 2nd item allows MySQL to start when the Mac is booted and the third is a System Preference that allows start/stop operation and a preference to enable it to start on boot.

You can start the MySQL server from the System Preferences or via the command line:

![][serverStart]

    sudo /usr/local/mysql/support-files/mysql.server start

To find the MySQL version from the terminal, type at the prompt:

    /usr/local/mysql/bin/mysql -v

This also puts you in to an interactive dialogue with mySQL, type \q to exit.

After installation, in order to use mysql commands without typing the full path to the commands you need to add the mysql directory to your shell path, (optional step) this is done in your ".bash_profile" file in your home directory, if you don’t have that file just create it using vi or nano:

    cd ; nano .bash_profile

and then:

    export PATH="/usr/local/mysql/bin:$PATH"

The first command brings you to your home directory and opens the .bash_profile file or creates a new one if it doesn’t exist, then add in the line above which adds the mysql binary path to commands that you can run. Exit the file with type "control + x" and when prompted save the change by typing "y". Last thing to do here is to reload the shell for the above to work straight away.

    source ~/.bash_profile

    mysql -v

You will get the version number again, just type "\q" to exit.

### Set the MySQL root password

__Note:__ that this is not the same as the root or admin password of OSX – this is a unique password for the __mysql root user__, use one and remember to write it down somewhere.

    /usr/local/mysql/bin/mysqladmin -u root password 'yourpasswordhere'

__Note__ : Use the single 'quotes’ surrounding the password.

### Fix the 2002 MySQL Socket error

Fix the looming 2002 socket error – which is linking where MySQL places the socket and where OSX thinks it should be, MySQL puts it in __/tmp__ and OSX looks for it in __/var/mysql__ the socket is a type of file that allows mysql client/server communication.

    sudo mkdir /var/mysql
    sudo ln -s /tmp/mysql.sock /var/mysql/mysql.sock

### phpMyAdmin

phpMyAdmin is installed pretty much the same way as before.

Fix the 2002 socket error first if you haven’t done so from the MySQL section above.

    sudo mkdir /var/mysql
    sudo ln -s /tmp/mysql.sock /var/mysql/mysql.sock

Download [phpMyAdmin](http://www.phpmyadmin.net/home_page/downloads.php), the zip package and move the folder with its contents into the document root level renaming folder to 'phpmyadmin’.

Make the __config__ folder:

    mkdir ~/Sites/phpmyadmin/config

Change the permissions:

    chmod o+w ~/Sites/phpmyadmin/config

Run the set up in the browser:

__http://localhost/~username/phpmyadmin/setup/__ or __http://localhost/phpmyadmin/setup/__



![][phpMyAdminNewServer]

You need to create a new localhost mysql server connection, click __new server__.

![][NewServerAuthenticate]

Switch to the __Authentication__ tab and set the local mysql root user and the password.
Add in the username "root" (maybe already populated, add in the password that you set up earlier for the MySQL root user set up, click on save and you are returned to the previous screen.

__Note:__ This is not the OSX Admin or root password – it is the __MySQL root user__.

Make sure you click on __save__, then a __config.inc.php__ is now in the __/config__ directory of phpmyadmin directory, __move__ this file to the root level of __/phpmyadmin__ and then remove the now empty __/config__ directory.

Now going to __http://localhost/~username/phpmyadmin/__ will now allow you to interact with your MySQL databases.

![][phpmyadmin]

To upgrade phpmyadmin just download the latest version and copy the older '__config.inc.php__' from the existing directory into the new folder and replace – backup the older one just in case.

## Permissions

To run a website with no permission issues it is best to set the web root and its contents to be writeable by all, since it’s a local development it should’nt be a security issue.

Lets say that you have a site in the __User Sites__ folder at the following location __~/Sites/testsite__ you would set it to be writeable like so:

    sudo chmod -R a+w ~/Sites/testsite

If you are concerned about security then instead of making it world writeable you can set the owner to be Apache __\_www__ but when working on files you would have to authenticate more as admin you are "not" the owner, you would do this like so:

    sudo chown -R _www ~/Sites/testsite

This will set the contents recursively to be owned by the Apache user.

If you had the website stored at the __System__ level Document root at say __/Library/WebServer/Documents/testsite__ then it would have to be done like this:

    sudo chown -R _www /Library/WebServer/Documents/testsite

So I think it’s worth setting up the User level root as there is __less authentication__!

If you need [virtual hosts](/archive/2014/07/24/Apache-Virtual-Hosts) configured I have added a separate guide on how to set these up in the Apache config files.

That’s it! You now have the native AMP stack running on of OSX Mavericks.

[AllowOveride]: /images/httpd.conf.jpg
[MySQL.DMG]: /images/mysql.dmg.png
[installPrefPane]: /images/mysql-pref-pane.png
[serverStart]: /images/start-mysql.png
[phpMyAdminNewServer]: /images/phpmyadmin-new-server.png
[NewServerAuthenticate]: /images/phpmyadmin-new-server-mysql-password.png
[phpmyadmin]: /images/phpmyadmin.png
