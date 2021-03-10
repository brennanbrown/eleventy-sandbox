const yaml = require("js-yaml");

module.exports = function(eleventyConfig) {

    // Exposing the eleventyConfig variable to process assets:
    eleventyConfig.addPassthroughCopy("./_site/images");
    eleventyConfig.addPassthroughCopy("./_site/css");

    // Creates shortcut aliases for long layout path names: 
    eleventyConfig.addLayoutAlias("base", "_pageTemplates/base.njk");
    eleventyConfig.addLayoutAlias("page", "_pageTemplates/page.njk");
    eleventyConfig.addLayoutAlias("page-hero", "_pageTemplates/page-hero.njk");

    /* 
      With shortcodes, you can write any JavaScript function you want. 
      And so you can use any sort of node module or any JavaScript
      you want to control how this information is processed:
    */
    eleventyConfig.addShortcode("clientTag", function(name) {
      return `<a class="badge badge-secondary mr-2" href="/clients/${name}">${name}</a>`
    });

    eleventyConfig.addPairedShortcode("pairedClient", function(data, name) {
      return `${data} <a class="badge badge-secondary" href="/clients/${name}">${name}</a>`
    });

    // Using the YAML data format instead of JSON:
    eleventyConfig.addDataExtension('yaml', contents => yaml.safeLoad(contents));

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