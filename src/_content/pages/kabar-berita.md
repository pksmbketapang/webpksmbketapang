---
layout: page
permalink: "news/{%- if pagination.pageNumber > 0 -%}{{ pagination.pageNumber | plus: 1 }}{%- else -%}index{%- endif -%}.html"
title: Kabar Berita
pagination:
    data: collections.news
    size: 10
    reverse: true
    alias: posts
---

{% for post in posts %}
{% include 'components/kabar-berita-content.liquid' %}
{% endfor %}