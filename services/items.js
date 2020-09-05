/* Items API */

const { searchItems } = require('../lib/meli');

const getItems = async ({ query }) => {
  const items = await searchItems(query);
  return items || {};
};

const getItem = async ({ id }) => {
  const item = await Promise.resolve({ id });
  return item || {};
};

module.exports = {
  getItems,
  getItem,
};
