---
layout: post
title: "I got gamed on Stack Overflow"
date: 2011-1-28 19:46
comments: true
categories: [Code, Stack Overflow, PHP]
description: "How I got suckered into doing someone's PHP homework on Stack Overflow"
---

{% img left http://images.darrenknewton.com/trollface.png 256 256 'Le Trollface' 'trollface' %}

Silly me. I stumbled across a question on Stack Overflow that was right up my alley, as it was something I had worked on before: [Extract Relevant Tag/Keywords from Text block](http://stackoverflow.com/questions/4828154/extract-relevant-tag-keywords-from-text-block/4828528). The question posted by [user593778](http://stackoverflow.com/users/593778/user593778) indicated that they wanted to use PHP or JavaScript to lift relevant keywords from a block of text.

_Awesome_. So I [started to answer the question](http://stackoverflow.com/questions/4828154/extract-relevant-tag-keywords-from-text-block/4828528#4828528), outlining an approach for the poster to use to solve her problem. What I didn't pay attention to was the fact that the user had a _single_ point on Stack Overflow.

Stack Overflow works on a point system: it taps the lizard brain in most geeks by awarding points for answering questions, posting question, upvoting, etc. You _want_ a high score. You're awarded badges for hitting different thresholds in the system. Points are the carrot and the stick (you lose points on downvotes) that get people to participate and behave themselves in the community.

Having **1** point means you just logged into the system. You haven't upvoted any other answers or answered any other questions. You haven't even completed your user profile. _This is a red flag._

Almost immediately the poster started to request more and more detail, basically asking for an implementation. We went back and forth a bit until I finally posted a full code example to the problem, at which point the poster disappeared. 

So, I did their work and didn't even get tagged as "the answer", which means I received no points. _I got played._

### Solution

My solution is somewhat naive, but it works (see Gist below). It takes the input text and breaks it into an array of words, which are then filtered against a [giant list of stop words](https://raw.github.com/gist/802249/240045c799bb5c11894a9f68ff7436b485c097a8/stop_words.txt).

{% gist 802249 stopwords.php %}

This is not something you would probably want to do in real time on a text of any length. You would probably schedule this as a background task.