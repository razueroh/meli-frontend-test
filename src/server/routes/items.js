const express = require('express');
const { getItems, getItem } = require('../services/items');

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
