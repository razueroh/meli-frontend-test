/* Items API */

const { searchItems, getItemData } = require('../lib/meli');

const getItems = async ({ query }) => {
  const items = await searchItems(query);
  return items || {};
};

const getItem = async ({ id }) => {
  const item = await getItemData(id);
  return item || {};
};

module.exports = {
  getItems,
  getItem,
};
