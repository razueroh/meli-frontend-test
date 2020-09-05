require('dotenv').config();

const config = {
  dev: process.env.NODE_ENV !== 'production',
  port: process.env.PORT || 3000,
  cors: process.env.CORS,
  meliHost: process.env.MELI_HOST,
  meliSearchLimit: process.env.MELI_SEARCH_LIMIT,
};

module.exports = { config };
