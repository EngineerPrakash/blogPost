module.exports = function (eleventyConfig) {
  // Copy assets directly
  eleventyConfig.addPassthroughCopy({ "src/assets": "assets" });
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
  eleventyConfig.addFilter("excerpt", (content, words = 40) => {
    if(!content) return "";
    const text = String(content)
      .replace(/<script[\s\S]*?<\/script>/gi, " ")
      .replace(/<style[\s\S]*?<\/style>/gi, " ")
      .replace(/<[^>]+>/g, " ")
      .replace(/\s+/g, " ")
      .trim();
    const parts = text.split(" ");
    return (parts.length > words) ? parts.slice(0, words).join(" ") + "…" : text;
  });
  eleventyConfig.addFilter("readTime", (content) => {
    if(!content) return "";
    const words = String(content)
      .replace(/<[^>]+>/g, " ")
      .trim()
      .split(/\s+/).filter(Boolean).length;
    const minutes = Math.max(1, Math.round(words / 200));
    return `${minutes} min read`;
  });
  eleventyConfig.addFilter("htmlDateString", (dateObj) => {
    try {
      return new Date(dateObj).toISOString();
    } catch (e) {
      return new Date().toISOString();
    }
  });
  eleventyConfig.addFilter("split", (value, sep) => {
    if (value === undefined || value === null) return [];
    return String(value).split(sep || "/");
  });
  eleventyConfig.addFilter("urlencode", (value) => {
    try { return encodeURIComponent(String(value)); } catch { return ""; }
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
