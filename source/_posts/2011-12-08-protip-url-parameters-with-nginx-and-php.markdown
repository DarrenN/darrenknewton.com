---
layout: post
title: "Protip: URL Parameters with Nginx & PHP"
date: 2011-12-08 09:11
comments: true
categories: [Code, Nginx, PHP]
description: "Protip: Setup Nginx to pass url params to your PHP front controller"
keywords: php, nginx, parameters, sysadmin, production, server
---

### TL;DR

To pass URL parameters to your PHP front controller under nginx setup your `nginx.conf` like so:

    location /www {
        try_files $uri $uri/ /www/index.php?$args;
    }

### What happened

I'm currently working on a small PHP application built with [Silex](http://silex.sensiolabs.org/) and served up with [nginx](http://www.nginx.org/). 
The application makes use of Twitter's API with OAuth 1.0 (which in my opinion is very difficult to use compared to Facebook's OAuth2 implementation.)

OAuth 1.0 requires GET/POSTing with urls like:

    /www/twitter/auth?oauth_token=XXX&oauth_verifier=XXX

Everything was working fine on my laptop under Apache, but not when I moved it to my dev server under nginx. Some logging revealed that the URL parameters
were not getting picked up by Silex's `Request` class.

I took a look at my `nginx.conf` and found the culprit, the redirect to the front controller was setup like so:

    location /www {
        try_files $uri $uri/ /www/index.php;
    }

This doesn't pass any URL parameters to `index.php`, so I simply added `?$args` to the redirect:

    location /www {
        try_files $uri $uri/ /www/index.php?$args;
    }

and **booya!** everything is working again.

_Reference: [nginx + php-fpm - where are my $_GET params?](http://forum.nginx.org/read.php?11,172365,172365)_
