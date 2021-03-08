
---
title: Testing various YAML attributes and variables!
date: 2020-01-03 # Could be "Created" or "Modified"
templateEngineOverride: md, njk
layout: page
object_examples:
    key: value
    array:
        - null_value:
        - boolean: true
        - integer: 1
paragraph: >
    Blank lines denote

    paragraph breaks like this!
content: |-
    Or you can
    auto-convert line
    breaks to save space!
tags:

- home
- welcome
- info

---

**Date:** {{ page.date.toUTCString() }}

**By:** {{ pkg.author }}

**Tags:**
<ul>
  {% for item in tags %}
  <li>{{ item }}</li>
  {% endfor %}
</ul>

Hello World, this post is called {{ title }}! Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi efficitur, mi non scelerisque lobortis, risus eros fermentum eros, et sagittis justo ex hendrerit tortor.
