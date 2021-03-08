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