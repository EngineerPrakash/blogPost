// Drafts are never built; scheduled (future-dated) posts are hidden in production.
// Future-dated posts remain visible in dev (`npm run dev`) for previewing.
const isProd = process.env.ELEVENTY_ENV === "production";

function isHidden(data) {
  if (data.draft) return true;
  const d = data.date ? new Date(data.date) : null;
  return Boolean(isProd && d && d.getTime() > Date.now());
}

module.exports = {
  layout: "layouts/post.njk",
  eleventyComputed: {
    permalink: (data) => (isHidden(data) ? false : data.permalink),
    eleventyExcludeFromCollections: (data) => isHidden(data),
  },
};
