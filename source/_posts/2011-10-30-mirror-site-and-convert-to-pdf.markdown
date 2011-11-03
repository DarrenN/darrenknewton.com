---
layout: post
title: "How to: Convert site to PDF with wkhtmltopdf and wget"
date: 2011-10-30 18:29
comments: true
categories: [Code, Bash, PDF, wget, wkhtmltopdf]
keywords: code, bash, pdf, wget, site, mirror, convert, wkhtmltopdf
description: "Use wget and wkhtmltopdf to mirror a site and convert to PDFs"
---

A friend of mine emailed me the other day with a quick question: _"What's an easy way to convert an entire site to PDF? Are there tools for this?"_

_Why yes, yes there are_. In fact, it's pretty easy to do if you're on a Mac or Linux OS using [wget](https://en.wikipedia.org/wiki/Wget) and [wkhtmltopdf](https://code.google.com/p/wkhtmltopdf/):

	mkdir /wget
	wget --mirror -w 2 -p --html-extension --convert-links -P /wget http://darrenknewton.com
	find darrenknewton.com -name '*.html' -exec wkhtmltopdf {} {}.pdf \;
	mkdir pdfs
	find darrenknewton.com -name '*.pdf' -exec mv {} pdfs/ \;

### Explanation

`wget` is a great little program to grab content from the web. It's a web Swiss Army Knife<sup>&reg;</sup>. `wkhtmltopdf` is another great piece of software which converts `html` to `pdf`. It can take content from the web itself, or pickup files from your desktop.

You can install both packages easily with [Homebrew](http://mxcl.github.com/homebrew/). If you're a [MacPorts](http://www.macports.org/index.php) person then you're out of luck with `wkhtmltopdf` and will need to pickup a [binary](https://code.google.com/p/wkhtmltopdf/downloads/list).

In this example I am mirroring the site to my desktop using `wget` and then doing the conversion to `pdf`. I could probably rig up a way to pass urls to `wkhtmltopdf` but I think making a local copy first gives me some flexibility and for a really big site I would be able to do the PDF conversion offline and at my leisure.

So first, let's mirror the site with `wget` (I'm going to use this site as an example):

	wget --mirror -w 2 -p --html-extension --convert-links -P /wget http://darrenknewton.com

This will spider the site and dump all of its files into `/wget`, a directory I made for this demo. When you spider my site `wget` will create a directory called `darrenknewton.com` like this:

	$ ls -alh darrenknewton.com

	drwxr-xr-x  12 shibuya  staff   408B Oct 30 18:17 .
	drwxr-xr-x   5 shibuya  staff   170B Oct 30 18:26 ..
	drwxr-xr-x   3 shibuya  staff   102B Oct 30 18:17 about
	-rw-r--r--   1 shibuya  staff   8.3K Oct 30 17:39 about.1.html
	-rw-r--r--   1 shibuya  staff   6.6K Oct 30 09:31 atom.xml
	drwxr-xr-x   6 shibuya  staff   204B Oct 30 18:17 blog
	-rw-r--r--   1 shibuya  staff   561B Oct 30 17:38 favicon.png
	drwxr-xr-x   8 shibuya  staff   272B Oct 30 17:39 images
	-rw-r--r--   1 shibuya  staff    13K Oct 30 17:39 index.html
	drwxr-xr-x   6 shibuya  staff   204B Oct 30 17:39 javascripts
	-rw-r--r--   1 shibuya  staff    22B Oct 30 09:31 robots.txt
	drwxr-xr-x   3 shibuya  staff   102B Oct 30 17:39 stylesheets

The `.html` files are all tucked away into directories, and we don't want to go manually searching for them, so we will let `find` do it for us. The following snippet will find all of the `.html` files and pass them to `wkhtmltopdf` for conversion:

	find darrenknewton.com -name '*.html' -exec wkhtmltopdf {} {}.pdf \;

This creates PDFs alongside the `html` files in the directory. So let's grab those and dump them into their own directory.

	mkdir pdfs
	find darrenknewton.com -name '*.pdf' -exec mv {} pdfs/ \;
	
And there you go, you should have a directory full of PDFs that [look something like this](http://images.darrenknewton.com/index.html.pdf).	