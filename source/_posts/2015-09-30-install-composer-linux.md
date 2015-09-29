---
title: Install Composer on Elementary
description: How to install the PHP dependency manager Composer on Elementary OS.
author: 'Kirk'
categories: [Linux]
tags: [elementary, tools, apps, composer]
header: /assets/img/linux.jpg
---
Installing Composer is fairly straight forward, however using it properly is a bit more complicated.

## Installing Locally

Installing Composer locally is a matter of just running the installer in your project directory:

```
curl -sS https://getcomposer.org/installer | php
```
If the above fails for some reason, you can download the installer with php instead:

```
php -r "readfile('https://getcomposer.org/installer');" | php
```

The installer will just check a few PHP settings and then download `composer.phar` to your working directory. This file is the Composer binary. It is a PHAR (PHP archive), which is an archive format for PHP which can be run on the command line.

Now just run `php composer.phar` in order to run Composer.

You can install Composer to a specific directory by using the `--install-dir` option and additionally rename it as well using the `--filename option`:

```
curl -sS https://getcomposer.org/installer | php -- --install-dir=bin --filename=composer
```

Now just run `php bin/composer` in order to run Composer.

## Installing Globally

You can place the Composer PHAR anywhere you wish. If you put it in a directory that is part of your PATH, you can access it globally. On unixy systems you can even make it executable and invoke it without directly using the php interpreter.

Run these commands to globally install composer on your system:

```
curl -sS https://getcomposer.org/installer | php
mv composer.phar /usr/local/bin/composer
```
If the above fails due to permissions, run the `mv` line again with `sudo`.
A quick copy-paste version including sudo:

```
curl -sS https://getcomposer.org/installer | sudo php -- --install-dir=/usr/local/bin --filename=composer
```

To add `/usr/local/bin` to your path:
```
export PATH=$PATH:/usr/local/bin
```
