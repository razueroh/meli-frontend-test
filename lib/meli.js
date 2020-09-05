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

  const items = (results || []).map((result) => {
    const [amount, decimals] = getPrice(result.price);
    return {
      id: result.id,
      title: result.title,
      price: {
        currency: result.currency_id,
        amount,
        decimals,
      },
      picture: result.thumbnail,
      condition: result.condition,
      free_shipping: result.shipping.free_shipping,
    };
  });

  const response = {
    ...jsonSign,
    categories: category,
    ...items,
  };

  return response;
};

const getItemData = async ({ id }) => {};

module.exports = {
  searchItems,
  getItemData,
};
