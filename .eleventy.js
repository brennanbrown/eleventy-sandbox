const yaml = require("js-yaml");

module.exports = function(eleventyConfig) {

    // Exposing the eleventyConfig variable to process assets:
    eleventyConfig.addPassthroughCopy("./site/images");
    eleventyConfig.addPassthroughCopy("./site/css");

    // Creates shortcut aliases for long layout path names: 
    eleventyConfig.addLayoutAlias("base", "_pageTemplates/base.njk");
    eleventyConfig.addLayoutAlias("page", "_pageTemplates/page.njk");
    eleventyConfig.addLayoutAlias("page-hero", "_pageTemplates/page-hero.njk");

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