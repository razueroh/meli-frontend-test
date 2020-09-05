const axios = require('axios');
const { config } = require('../config/index');
const { getCategory, getPrice } = require('../utils/helpers');

const http = axios.create({
  baseURL: config.meliHost,
  timeout: 3000,
});

const jsonSign = {
  author: {
    name: 'Rafael',
    lastname: 'Azuero',
  },
};

const searchItems = async (query) => {
  const { data } = await http.get(
    `sites/MLA/search?q=${query}&limit=${config.meliSearchLimit}`
  );
  const { results, available_filters: filters } = data;

  const category = getCategory(filters);

  const items = (results || []).map((item) => {
    const [amount, decimals] = getPrice(item.price);
    return {
      id: item.id,
      title: item.title,
      price: {
        currency: item.currency_id,
        amount,
        decimals,
      },
      picture: item.thumbnail,
      condition: item.condition,
      free_shipping: item.shipping.free_shipping,
    };
  });

  return {
    ...jsonSign,
    categories: category,
    ...items,
  };
};

  return response;
};

const getItemData = async ({ id }) => {};

module.exports = {
  searchItems,
  getItemData,
};
