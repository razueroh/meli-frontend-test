const express = require('express');

const itemsApi = (app) => {
  const router = express.Router();
  app.use('/api/items', router);

  router.get('/', async (req, res, next) => {
    try {
      const { q } = req.query;
      res.status(200).json({ q });
    } catch (error) {
      next(error);
    }
  });

  router.get('/:id', async (req, res, next) => {
    try {
      const { id } = req.params;
      res.status(200).json({ id });
    } catch (error) {
      next(error);
    }
  });
};

module.exports = itemsApi;
