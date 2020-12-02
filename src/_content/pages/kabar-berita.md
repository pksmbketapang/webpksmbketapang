---
layout: page
permalink: news/index.html
title: Kabar Berita
pagination:
    data: collections.news
    size: 12
    reverse: true
    alias: posts
---

{% for post in posts %}
{% include 'components/kabar-berita-content.liquid' %}
{% endfor %}