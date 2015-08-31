---
title: Using dnsmasq for Local Development
author: 'Kirk'
tags: [dnsmasq, dns, development]
categories: [OSX]
description: How to use dnsmasq to redirect to your development sites on OSX.
header: /assets/img/osx.jpg
---

















    cp $(brew list dnsmasq | grep /dnsmasq.conf.example$) /usr/local/etc/dnsmasq.conf










    testing.testing.one.two.three.dev. 0 IN A     127.0.0.1

## Configuring OS X













    nameserver 127.0.0.1
    EOF





    # Make sure you haven't broken your DNS.
    ping -c 1 this.is.a.test.dev
    ping -c 1 iam.the.walrus.dev


