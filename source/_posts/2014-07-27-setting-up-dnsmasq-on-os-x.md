---
title: Using dnsmasq for Local Development
author: 'Kirk'
tags: [dnsmasq, dns, development]
categories: [OSX]
description: How to use dnsmasq to redirect to your development sites on OSX.
header: /assets/img/osx.jpg
highlight: true
---
Most web developers will be familiar with the process of updating your <code>/etc/hosts</code> file to direct traffic for <code>megacoolproject.dev</code> to <code>127.0.0.1</code>. Most will also be familiar with the problems of this approach:
- it requires a configuration change every time you add or remove a project; and
- it requires administration access to make the change.
Installing a local DNS server like [dnsmasq](http://www.thekelleys.org.uk/dnsmasq/doc.html) and configuring your system to use that server can make these configuration changes a thing of the past. In this post, I’ll run through the process of:
1. Installing dnsmasq on OS X.
2. Configuring dnsmasq to respond to all <code>.dev</code> requests with <code>127.0.0.1</code>.
3. Configure OS X to send all <code>.dev</code> requests requests to dnsmasq.
Before we get started, I should give you a warning: these instructions show you how to install new system software and change your system configuration. Like all such changes, you __should not proceed__ unless you are confident you have understood them and that you can reverse the changes if needed.
## Installing dnsmasqTo quote the dnsmasq project home page> dnsmasq is a lightweight, easy to configure DNS forwarder and DHCP server [...] is targeted at home networks[.]
There are plenty of ways to install dnsmasq but my favourite (on OS X) is to use the [Homebrew](http://http://brew.sh/) package manager. Installing Homebrew is fairly simple but beyond my scope here.
Once you have Homebrew installed, using it to install dnsmasq is easy:
    # Update your homebrew installation
    brew up
    # Install dnsmasq
    brew install dnsmasq
The installation process will output several commands that you can use to start dnsmasq automatically with a default configuration. I used the following commands but you should use whichever commands<code>brew</code> tells you to:
    # Copy the default configuration file.
    cp $(brew list dnsmasq | grep /dnsmasq.conf.example$) /usr/local/etc/dnsmasq.conf    # Copy the daemon configuration file into place.    sudo cp $(brew list dnsmasq | grep /homebrew.mxcl.dnsmasq.plist$) /Library/LaunchDaemons/ # Start dnsmasq automatically.    sudo launchctl load /Library/LaunchDaemons/homebrew.mxcl.dnsmasq.plist## Configuring dnsmasq
Now that you have dnsmasq installed and running, it’s time to configure it! The configuration file lives at <code>/usr/local/etc/dnsmasq.conf</code> by default, so open this file in your favourite editor.
One the many, many things that dnsmasq can do is compare DNS requests against a database of patterns and use these to determine the correct response. I use this functionality to match any request which ends in <code>.dev</code> and send <code>127.0.0.1</code> in response. The dnsmasq configuration directive to do this is very simple:
    address=/dev/127.0.0.1
Insert this into your <code>/usr/local/etc/dnsmasq.conf file</code> (I put it near the example <code>address=/double-click.net/127.0.0.1</code> entry just to keep them all together) and save the file.
You may need to restart dnsmasq to get it to recognise this change. Restarting dnsmasq is the same as any other service running under <code>launchd</code>:
    sudo launchctl stop homebrew.mxcl.dnsmasq    sudo launchctl start homebrew.mxcl.dnsmasq
You can test dnsmasq by sending it a DNS query using the <code>dig</code> utility. Pick a name ending in dev and use dig to query your new DNS server:
    dig testing.testing.one.two.three.dev @127.0.0.1
You should get a response something like:
    ;; ANSWER SECTION:
    testing.testing.one.two.three.dev. 0 IN A     127.0.0.1

## Configuring OS XNow that you have a working DNS server you can configure your operating system to use it. There are two approaches to this:
1. Send all DNS queries to dnsmasq.
2. Send only <code>.dev</code> queries to dnsmasq.
The first approach is easy – just change your DNS settings in System Preferences – but probably won’t work without additional changes to the dnsmasq configuration.
The second is a little bit more tricky, but not much. Most UNIX-like operating systems have a configuration file called <code>/etc/resolv.conf</code> which controls the way DNS queries are performed, including the default server to use for DNS queries (this is the setting that gets set automatically when you connect to a network or change your DNS server/s in System Preferences).
OS X also allows you to configure additional resolvers by creating configuration files in the <code>/etc/resolver/</code> directory. This directory probably won’t exist on your system, so your first step shouldbe to create it:
    sudo mkdir -p /etc/resolver
Now you should create a new file in this directory for each resolver you want to configure. Each resolver corresponds – roughly and for our purposes – to a top-level domain like our <code>dev</code>. There a number of details you can configure for each resolver but I generally only bother with two:
- the name of the resolver (which corresponds to the domain name to be resolved); and
- the DNS server to be used.
For more information about these files, see the <code>resolver(5)</code> manual page:
    man 5 resolver
Create a new file with the same name as your new top-level domain (I’m using <code>dev</code>, recall) in the <code>/etc/resolver/</code> directory and add a <code>nameserver</code> to it by running the following commands:
    sudo tee /etc/resolver/dev > /dev/null <<EOF
    nameserver 127.0.0.1
    EOF
Here <code>dev</code> is the top-level domain name that I’ve configured dnsmasq to respond to and <code>127.0.0.1</code> is the IP address of the server to use.
Once you’ve created this file, OS X will automatically read it and you’re done!
## Testing
Testing you new configuration is easy; just use ping to check that you can now resolve some DNS names in your new top-level domain:

    # Make sure you haven't broken your DNS.    ping -c 1 www.google.com    # Check that .dev names work
    ping -c 1 this.is.a.test.dev
    ping -c 1 iam.the.walrus.dev
You should see results that mention the IP address in your dnsmasq configuration like this:
    PING iam.the.walrus.dev (127.0.0.1): 56 data bytesYou can now just make up new DNS names under <code>.dev</code> whenever you please. Congratulations!
Maybe the next step on your journey should be learning how to do configure Apache virtual hosts automatically based on host names?