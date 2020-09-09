const axios = require('axios');
const { config } = require('../config/index');
const { getCategory, getPrice } = require('../utils/helpers');

const http = axios.create({
  baseURL: config.meliHost,
  timeout: 5000,
});

const jsonSign = {
  author: {
    name: 'Rafael',
    lastname: 'Azuero',
  },
};

const searchItems = async (query) => {
  const { data } = await http.get(`sites/MLA/search?q=${encodeURIComponent(query)}&limit=${config.meliSearchLimit}`);
  const { results, filters } = data;

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
      location: item.address.state_name,
    };
  });

  return {
    ...jsonSign,
    categories: category,
    items,
  };
};

const getItemData = async (id) => {
  const { data: item } = await http.get(`/items/${id}`);
  const {
    data: { plain_text: description },
  } = await http.get(`/items/${id}/description`);

  const [amount, decimals] = getPrice(item.price);

  return {
    ...jsonSign,
    item: {
      id: item.id,
      title: item.title,
      price: {
        currency: item.currency_id,
        amount,
        decimals,
      },
      picture: item.thumbnail.replace(/-I/, '-L'),
      condition: item.condition,
      free_shipping: item.shipping.free_shipping,
      sold_quantity: item.sold_quantity,
      description,
    },
  };
};

module.exports = {
  searchItems,
  getItemData,
};
