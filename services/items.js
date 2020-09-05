/* Items API */

const getItems = async ({ query }) => {
  const items = await Promise.resolve({ query });
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
