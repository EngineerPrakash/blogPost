const site = require('./site.json');
const isProd = process.env.ELEVENTY_ENV === 'production';
module.exports = {
  isProd,
  base: isProd ? (site.base || '') : ''
};

