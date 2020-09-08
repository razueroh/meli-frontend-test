const { config } = require('../config');

const cacheResponse = (res, seconds) => {
  if (!config.dev) {
    res.header('Cache-Control', `public, max-age=${seconds}`);
  }
};

module.exports = cacheResponse;
