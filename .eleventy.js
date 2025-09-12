module.exports = function (eleventyConfig) {
  // Copy assets directly
  eleventyConfig.addPassthroughCopy({ "src/assets": "assets" });
  eleventyConfig.addPassthroughCopy("src/CNAME");
  eleventyConfig.addWatchTarget("src/assets/styles.css");

  // Filters
  eleventyConfig.addFilter("date", (dateObj) => {
    try {
      return new Intl.DateTimeFormat("en", { dateStyle: "medium" }).format(dateObj);
    } catch (e) {
      return String(dateObj);
    }
  });
  eleventyConfig.addFilter("json", (value) => {
    try { return JSON.stringify(value); } catch { return "null"; }
  });
  eleventyConfig.addFilter("htmlDateString", (dateObj) => {
    try {
      return new Date(dateObj).toISOString();
    } catch (e) {
      return new Date().toISOString();
    }
  });

  // Collections
  eleventyConfig.addCollection("posts", (collectionApi) => {
    return collectionApi
      .getFilteredByGlob("src/posts/*.md")
      .sort((a, b) => b.date - a.date);
  });

  // Unique sorted tag list
  eleventyConfig.addCollection("tagList", (collectionApi) => {
    const tagSet = new Set();
    collectionApi.getAll().forEach((item) => {
      if ("tags" in item.data) {
        let tags = item.data.tags;
        if (typeof tags === "string") tags = [tags];
        (tags || []).forEach((tag) => {
          if (!["all", "nav", "post", "posts", "tagList"].includes(tag)) {
            tagSet.add(tag);
          }
        });
      }
    });
    return [...tagSet].sort();
  });

  return {
    dir: { input: "src", includes: "_includes", data: "_data", output: "dist" },
    templateFormats: ["njk", "md", "html"],
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    passthroughFileCopy: true,
  };
};
