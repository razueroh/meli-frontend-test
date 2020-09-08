const express = require('express');
const { getItems, getItem } = require('../services/items');
const cacheResponse = require('../utils/CacheResponse');
const { FIVE_MINUTES_IN_SECONDS } = require('../utils/time');

const itemsApi = (app) => {
  const router = express.Router();
  app.use('/api/items', router);

  router.get('/', async (req, res, next) => {
    const { q: query } = req.query;

    try {
      const items = await getItems({ query });
      res.status(200).json(items);
    } catch (error) {
      next(error);
    }
  });

  router.get('/:id', async (req, res, next) => {
    cacheResponse(res, FIVE_MINUTES_IN_SECONDS);
    const { id } = req.params;

    try {
      const item = await getItem({ id });
      res.status(200).json(item);
    } catch (error) {
      next(error);
    }
  });
};

module.exports = itemsApi;
