const yaml = require("js-yaml");
const { DateTime } = require("luxon");

module.exports = function (eleventyConfig) {
  // Exposing the eleventyConfig variable to process assets:
  eleventyConfig.addPassthroughCopy("./_site/images");
  eleventyConfig.addPassthroughCopy("./_site/css");

  // Creates shortcut aliases for long layout path names:
  eleventyConfig.addLayoutAlias("base", "_pageTemplates/base.njk");
  eleventyConfig.addLayoutAlias("page", "_pageTemplates/page.njk");
  eleventyConfig.addLayoutAlias("page-post", "_pageTemplates/page-post.njk");
  eleventyConfig.addLayoutAlias("page-hero", "_pageTemplates/page-hero.njk");

  /* 
      With shortcodes, you can write any JavaScript function you want. 
      And so you can use any sort of node module or any JavaScript
      you want to control how this information is processed:
    */
  eleventyConfig.addShortcode("clientTag", function (name) {
    return `<a class="badge badge-secondary mr-2" href="/clients/${name}">${name}</a>`;
  });

  eleventyConfig.addPairedShortcode("pairedClient", function (data, name) {
    return `${data} <a class="badge badge-secondary" href="/clients/${name}">${name}</a>`;
  });

  // Using the YAML data format instead of JSON:
  eleventyConfig.addDataExtension("yaml", (contents) => yaml.load(contents));

  // Using Luxon to make custom filters for readable date formatting:
  eleventyConfig.addFilter("simpleDate", (dateObj) => {
    return DateTime.fromJSDate(dateObj, { zone: "utc" }).toFormat(
      "LLL dd, yyyy"
    );
  });

  eleventyConfig.addFilter("courseDate", (dateObj) => {
    return DateTime.fromFormat(dateObj, "LLL d, yyyy").toFormat("yyyy-LL-dd");
  });

  return {
    markdownTemplateEngine: "njk",
    dir: {
      input: "_site",
      data: "_data",
      includes: "_includes",
      layouts: "_layouts",
      output: "dist",
    },
  };
};
