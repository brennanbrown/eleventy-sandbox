# Building Serverless Apps with JAMStack and Eleventy

> **NOTE:** In order to not have the display break when writing example code, all `{{` brackets have been replaced with `[[` brackets.

**Table of Contents:**

- [Building Serverless Apps with JAMStack and Eleventy](#building-serverless-apps-with-jamstack-and-eleventy)
  - [Getting Started](#getting-started)
    - [What IS the JAMStack?](#what-is-the-jamstack)
    - [What is Eleventy?](#what-is-eleventy)
    - [Eleventy Commands](#eleventy-commands)
    - [Building a Project](#building-a-project)
  - [Organizing a Serverless Website](#organizing-a-serverless-website)
    - [Creating Front Matter Data](#creating-front-matter-data)
    - [Building a Template Page](#building-a-template-page)
    - [Layout Chaining](#layout-chaining)
  - [Using Site Data](#using-site-data)
    - [Using a Data File](#using-a-data-file)
    - [Adding Directory Data](#adding-directory-data)
  - [Working with Content Features](#working-with-content-features)
  - [Managing Collections](#managing-collections)
  - [Using Pagination and Plugins](#using-pagination-and-plugins)
  - [Conclusion](#conclusion)

<!-- Topics include:

- Creating your project
- Organizing the site with templates and layouts
- Adding directory data
- Loading data dynamically with APIs
- Building pages from data
- Managing collections
- Adding pagination and navigation -->

## Getting Started

### What IS the JAMStack?

- Before we get too far, let's make sure we clarify what the JAMStack is and why Eleventy is a good way to go serverless.
  - The JAM in JAMStack refers to three technologies that are used when working with this process.
- First, the **J** in JAMStack is for **JavaScript** is used to process files and create the site itself. Now this is managed using Node.js and is the main engine for creating your sites or apps.
- The **A** in JAMStack is for **APIs**.
  - This is an acronym for application programmer interface and it provides a way for an application created with the JAMStack to communicate with external tools to create dynamic experiences when needed.
  - Although most of the site is pre-rendered, APIs allow you to have some dynamic features.
- The final piece or the **M** in the JAMStack is **markup** which means that your site is generated from a series of templates and documents that will get processed into a site.
  - You use a combination of markup written in traditional languages like HTML and CSS as well as template languages like Liquid and other languages like Markdown and YAML for the content.
- The JAMStack belongs to a family of technologies called serverless.
  - Serverless sites are hosted and deployed on servers just like any other site but it's how those servers handle requests that is different.
  - Serverless sites are, for the most part, pre-rendered which means that instead of querying a database to create a custom experience every time, all of the HTML pages on the site are pre-rendered before it gets sent to a server.
  - Serverless sites often use CDNs, which are content delivery networks. This means that copies of the site are placed strategically throughout the world to make sure that the content from the sites are cached or stored closer to a user's machine.
- How is this all an advantage?
  - First, serverless sites are super fast. Normal sites run databases and you have to query them every time you request a page to build custom content for your user.
  - A serverless or JAMStack site **pre-renders** the entire website or application, so there's much less overhead when requesting a page and because there is no database and most of the site is pre-rendered, there aren't any database vulnerabilities to worry about.
  - Because most of the site is pre-rendered and there is no database overhead, the server that hosts the site doesn't require a ton of power or throughput so costs are generally lower than on regular websites.
- In this specific example project, we'll be using an engine call **Eleventy**.
  - Eleventy uses Node.js to process templates which means that it's fast and that you can use Node.js modules or JavaScript features in your typical build process.
  - Node.js has thousands of modules that you can use with your website or application. One of the advantages of Eleventy is that is uses a flexible templating system.
  - Eleventy will process templates in not just one but more than 10 different languages, including Liquid, POG, EJS, Mustache, and JavaScript Template Literals. It's very flexible in that way.
  - It's also easy to either generate data from your content or read data from a JSON file through an API to help you generate some content.
- There are a lot of other options that you can use to generate a serverless or a JAMStack site like Jekyll and others, but I really love Eleventy because it's easier for people who are familiar with Node build projects.

### What is Eleventy?

- Eleventy was created to be a JavaScript alternative to Jekyll.
  - It???s zero-config by default but has flexible configuration options.
  - Eleventy works with your project???s existing directory structure.
- It's apparently basic in terms of functionality at its core.
- It's designed to simply be an engine that manages the conversion of templates to pages.
  - It's made like that on purpose, it doesn't assume that you're using a specific build process or even that you'll be using a build process at all. Thus, it's made to be super flexible.

### Eleventy Commands

- One of the advantages of using something like Eleventy over other products is that it lets you use NodeJS and npm to manage your modules and projects.
- You can _try out_ Eleventy by using the `npx eleventy /folder` command, which runs the Eleventy format, without having to install anything on your platform globally.
- You can also install it _globally_ using `npm install -f @11ty/eleventy`, and the commands are going to be a little bit easier to run this way.
- You can also install it as a _project_ using `npm i @11ty/eleventy`.
- By default, running the Eleventy command will choose the current folder as the _input_ location, but you can change that with a special flag called input, like this `--input=`.
  - In order to not generate other markdown files in your repository, such as the README or LICENSE, use the `eleventy --input=_site --output` to only procress files in the site folder.
  - This will create a new `/build` subfolder, which will be added to the `.gitignore` file.
- The default _destination_ folder is `_site`. If you want to create a folder like a builds or a dist folder, you can use the output flag `--output=_site`.
- You can watch a specific folder for changes with the `--watch` option or use the `--serve` option to use something called _Browsersync_.
  - Adding the `--watch` command will auto-update the build of the website anytime a file is modified, deleted, or creatd.
  - This will allow you to monitor changes and also run a live preview server so that you can see changes in your browser after you make them in the files.
- In whole, using the command **`eleventy --input=_site --output=build --serve`** will run your project in an easily manageable fashion.
- You can also run the `--help` flag, and you'll get a list of all the current commands.
- You can also check out the Eleventy website and look for the docs section, and then go to the command line usage section right here to find out some of the other commands.

### Building a Project

- Working with a web project can get really complicated, so it's usually better to create a project and Node.js is going to make that easier.
- The easiest way to create a project is by setting up a package.json file, and you can do that the quickest by issuing an `npm init -y command`.
  - This is going to create a `package.json` with the defaults, which will need to be modified.
- A `start` script is also needed, which will automatically run the command to build the site that was discussed in the above commands.
- You can also add a `.eleventy.js` configuration file, which will make it easier to run the project, as well as customize the configuration.

**`.eleventy.js:`**

```js
module.exports = function(eleventyConfig) {

    // Exposing the eleventyConfig variable to process assets:
    eleventyConfig.addPassthroughCopy("./site/images");
    eleventyConfig.addPassthroughCopy("./site/css");

    // Creates shortcut aliases for long layout path names:
    eleventyConfig.addLayoutAlias("base", "pageTemplates/base.njk);
    eleventyConfig.addLayoutAlias("page", "pageTemplates/page.njk);
    eleventyConfig.addLayoutAlias("page-hero", "pageTemplates/page-hero.njk);

    return {
      markdownTemplateEngine: 'njk',
      dir: {
        input: "_site",
        data: "_data",
        includes: "_includes",
        layouts: "_layouts",
        output: "dist"
      }
    }
}
```

- You can save the input and output folders by using the above file for Eleventy, which can be then pushed into the `package.json` file:

**`package.json`:**

```json
{
  "name": "jamstack",
  "version": "1.0.0",
  "scripts": {
    "start": "eleventy --serve --quiet"
  }
}
```

- Having the above will allow you to simply run the `npm start` command and have the site build automatically.

## Organizing a Serverless Website

### Creating Front Matter Data

- One of the highlights of Eleventy is that it allows you to create variables that you can use in your markdown documents or in other templates.
  - Meaning you can add something called front matter data into markdown files.
- YAML, for instance, using three dashes to separate front matter data from the rest of the file, as seen in the example below.
  - In addition to using anything that you've created and the front matter, you can also get information about the current page, and also any information in your package .JSON file with the two special variables `page` and `pkg`.

```markdown
---
title: Testing YAML
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

**Date:** [[page.date.toUTCString()]]

**By:** [[pkg.author]]

**Tags:**

<ul>
  [% for item in tags %]
  <li>[[ item ]]</li>
  [% endfor %]
</ul>

Hello World, this post is called [[title]]! Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi efficitur, mi non scelerisque lobortis, risus eros fermentum eros, et sagittis justo ex hendrerit tortor.
```

- The above unformation is exposed in a templating language, of which there are eleven different ones that you can use with Eleventy.
- **Liquid** is the default in Eleventy, but a lot of times you'll notice that the documentation will be written in **Nunjucks** which is what's used in this project. They are pretty similar.
- If you want to, you can override the default engine for the entire Website by using a markdown template engine variable in your Eleventy.js configuration file.
  - But you can also override the template for the specific page by using a template engine override variable in your markdown front matter.
  - For that, you would add `templateEngineOverride: md, njk` in the YAML.

### Building a Template Page

- Eleventy allows you to create a type of document called a layout and these are templates that you can wrap around pieces of content.
- The way that this works is by looking for an `_includes` folder by default, and any files that you put in there can be accessed through the front matter in your markdown documents.
  - You can also override the location of these files, so in your `eleventy.js` file you can modify the `dir.includes` object and specify that you want the templates to be somewhere else.
  - By default, is going to assume that all of these live inside whatever is the input folder for your project, which would be the `_site` folder.
- You can also separate _templates_ from _includes_, includes can have additional pieces of information in them, so you can create a separate folder for only templates.
  - This makes things a little bit cleaner and more organized.
- Templates themselves can have their own frontmatter variables.
  - You can use those inside the template itself, or also the content that is being wrapped by the template.
  - In order to use the content that is going to be wrapped by the template, you can use a special content variable `[[ content | safe ]]`.
    - And if you're using Nunjunks, you want to use the save filter like this, so it doesn't double process variables.
  - **Layout:** `path/mylayout.njk`
  - You can alias the template path with the following function: `eleventyConfig.addLayoutAlias("name", "path");`
- This means that you can easily create layouts, create aliases to layouts and create multiple page layouts by putting things inside my layouts folder.

**`_site/_layouts/pageTemplates/base.njk`:**

```html
---
siteTitle: JAMStack with Eleventy
---

<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta
      name="viewport"
      content="width=device-width, initial-scale=1, shrink-to-fit=no"
    />
    <title>[[siteTitle]] -- [[Title]]</title>
    <script
      defer
      src="https://use.fontawesome.com/releases/v5.7.2/js/all.js"
      integrity="sha384-0pzryjIRos8mFBWMzSSZApWtPl/5++eIfzYmTgBBmXYdhvxPc+XcFEk+zJwDgWbP"
      crossorigin="anonymous"
    ></script>
    <link
      rel="stylesheet"
      href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css"
      integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh"
      crossorigin="anonymous"
    />
    <link rel="stylesheet" href="/css/styles.css" />
  </head>
  <body class="bg-dark">
    <div class="container">
      <div class="bg-white">[[ content | safe ]]</div>
      [% include "social.njk" %]
    </div>
  </body>
  <script
    src="https://code.jquery.com/jquery-3.4.1.slim.min.js"
    integrity="sha384-J6qa4849blE2+poT4WnyKhv5vZF5SrPo0iEjwBvKU7imGFAV0wwj1yYfoRSJoZ+n"
    crossorigin="anonymous"
  ></script>
  <script
    src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js"
    integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo"
    crossorigin="anonymous"
  ></script>
  <script
    src="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js"
    integrity="sha384-wfSDF2E50Y2D1uUdj0O3uMBJnjuUD4Ih7YwaYd1iqfktj0Uod8GCExl3Og8ifwB6"
    crossorigin="anonymous"
  ></script>
</html>
```

### Layout Chaining

- Eleventy let's use templates in a way that's _recursive_ so that one template can be based on another.
  - This is a pretty powerful way to build templates.
- You have to be aware of something called the **data cascades.**
  - There are some instances when the variables in your template or layout will create a conflict with other variables.
  - How this gets resolved is known as the data cascade.
- Before Eleventy renders your page, the data is going to be merged from your content page,
  - Then, your layouts from the closest layout to the outermost layout.
- The way that this happens is that the layouts that are closest to the content will get processed with more importance than anything that is farther away from the original data.
  - So, your markdown files would have the most specificity in CSS terms.
- One template can be used for one purpose, and that template can be based on another template, and another template can be used for another purpose, etc. and still be based on the same template.
  - So, you generally have a base template with sort of just a basic HTML for every page and then you add different page layout templates for any of your other needs.
- Using the data cascade to your advantage:
  - If you're hard-coding a value that you would rather have different values for different pages, you can use the data cascade and create a variable `{{headerHeight}}` and add it to the tempalte.

**`_site/_layouts/pageTemplates/page-hero.njk`:**

```html
---
layout: base
headerHeight: 50vh
---

<!-- Used for pages that have a "hero" graphic: -->
<header
  class="site-header position-relative"
  style="width: 100vw; min-height: [[headerHeight]];"
>
  <section
    class="layout-hero position-absolute d-flex align-items-center"
    style="background-image: linear-gradient(rgba(0, 0, 0, .7) 50px, transparent), 
  url({{hero}}); height: 100%; width: 100%;"
  ></section>
  <div
    class="layout-hero-content position-absolute d-flex align-items-center w-100 h-100"
  >
    <div class="container">
      <div class="row justify-content-center text-center">
        <div class="header-content col-11 col-sm-10 col-md-9 animated fadeInUp">
          <h2 class="page-section-title text-light">[[ title ]]</h2>
          <p class="page-section-text text-light d-none d-md-block">
            [[ summary | safe ]]
          </p>
        </div>
      </div>
    </div>
  </div>
</header>
<main class="container py-4">[[ content | safe ]]</main>
```

**`_site/_layouts/pageTemplates/page.njk`:**

```html
---
layout: base
---

<main class="container mt-4">[[ content | safe ]]</main>
```

**`_site/about/index.md`:**

```html
---
title: About Me
layout: page-hero
headerHeight: 70vh
hero: https://brennanbrown.ca/img/header.jpg
summary: Content Strategist and Web Developer looking to improve lives with the JAMstack!
permalink: "/about-[[ pkg.author | slug ]]/"
---

# [[title]] Hey there! My name is Brennan, I'm a 24-year-old M??tis web developer
and content strategist from Winnipeg, Manitoba and currently reside in Calgary,
Alberta. I've recently compeleted a Full Stack Developer Program at
[EvolveU](https://www.evolveu.ca/), and I'm looking to help those that need web
development work done, or searching for ideas and management for their next
content project. I would also love to volunteer my time to contributing to
open-source projects! I love creating and tinkering with small, static websites
and projects. I'm a big proponent of putting an emphasis on accessibility and
the [A11y project](https://www.a11yproject.com/) in web development. I'm always
looking to work with people that are hopeless idealists like me, as well as who
are interested in creating and working on cool, interesting, and meaningful
projects! Shoot me [an e-mail](mailto:mail@brennanbrown.ca) if that sounds like
your cup of tea.
```

**`_site/css/styles.css`:**

```css
.layout-hero {
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;
}
```

## Using Site Data

### Using a Data File

- You can make information available to your site by adding data in a few different ways:
  - You can add data in a couple different formats: You can use the `JSON` format or you can use the `module.exports` object in any JavaScript file.
  - And you can pass along variables which will then be available to your website.
- By default, any global data that you want to store for the entire site can be placed in a `_data` folder or `dir.data`.
  - That can also be overwritten by using the directory object in the `11T.js` document with a data variable.
- The folder structure of where you put that data _does_ matter.
  - For example: If you want to have a variable called `social.site`, you can just place the data in the `_data/social/` folder and then put a file named `site.json` in that folder.
  - If you just wanted to have a `social.json` file, you would just call this `_/data/social.json` and it would automatically add a variable called social to your website.
- The data can be available either to the entire website or you can place it anywhere in the file structure of your website.
  - For example: If you want the information to only be available to your posts, then you would put the data file in the `_site/posts` location.
  - Or you can put it anywhere else, and then anything in that folder will have access to that data.
- Another example: Create some navigation with social media links.

**`_site/_data/social.json`:**

```json
[
  {
    "name": "github",
    "iconClass": "fab fa-github",
    "url": "https://github.com/brennanbrown"
  },
  {
    "name": "linkedin",
    "iconClass": "fab fa-linkedin",
    "url": "https://linkedin.com/in/brennankbrown"
  },
  {
    "name": "twitter",
    "iconClass": "fab fa-twitter",
    "url": "https://twitter.com/brennankbrown"
  },
  {
    "name": "dribble",
    "iconClass": "fab fa-dribbble",
    "url": "https://dribbble.com/brennanbrown"
  },
  {
    "name": "flickr",
    "iconClass": "fab fa-flickr",
    "url": "https://www.flickr.com/photos/brennankbrown/sets/72157602932636630/"
  },
  {
    "name": "youtube",
    "iconClass": "fab fa-youtube",
    "url": "https://www.youtube.com/user/brennankbrown"
  },
  {
    "name": "instagram",
    "iconClass": "fab fa-instagram",
    "url": "https://www.instagram.com/iviewsource"
  }
]
```

- Generally, you create layouts for things like pages and then you use the **`_includes`** folder for simpler or smaller things.
  - These can be considered 'modular' containers of information that might be used on multiple pages, or just be separated to files smaller and more readable.

**`_site/_includes/social.njk`:**

```njk
<nav class="nav-social navbar navbar-expand navbar-dark justify-content-center">
  <div class="navbar-nav">
  [%- for item in social-%]
    <a class="nav-item nav-link" target="_blank" href="[[item.url]]">
      <i class="nav-social-icon [[item.iconClass]] mr-2"></i>
      <span class="align-text-bottom text-white d-none d-lg-inline">[[item.name]]</span>
    </a>
  [%- endfor -%]
  </div>
</nav>
```

### Adding Directory Data

- In addition to creating global data files, you can create files that apply to a specific directory. So for example, I have this posts directory right here and it has a bunch of files. Let's say that I wanted to modify the layout of each of these files to use my base template. Right now if you look at the processed version, so if we open up the distribution folder and we look at posts and then we find an index that HTML in one of the folders there, you'll see that it doesn't use any template. It's just taking the markdown and converting it to HTML. Which is not necessarily what we want so let's go ahead and create a new file in this Post's directory. And the trick is you have to name it the same thing as the directory name. So you say posts.JSON. And then in here we can add variables that every page will have. So we can modify the layout variable here and set it to page. And remember this isn't YAML, it's JSON. So you do have to quote the key and the value pairs. So it's a little bit different than what you do in the markdown documents.

## Working with Content Features

## Managing Collections

## Using Pagination and Plugins

## Conclusion
