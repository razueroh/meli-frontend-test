const axios = require('axios');
const { config } = require('../config/index');
const { getCategory, getCategoriesPath, getPrice } = require('../utils/helpers');

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
  const { results, filters, available_filters: availableFilters } = data;

  const categories = getCategory(filters, availableFilters);

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
    categories,
    items,
  };
};

const getItemData = async (id) => {
  const { data: item } = await http.get(`/items/${id}`);
  const {
    data: { plain_text: description },
  } = await http.get(`/items/${id}/description`);
  const {
    data: { path_from_root: path },
  } = await http.get(`/categories/${item.category_id}`);

  const [amount, decimals] = getPrice(item.price);

  return {
    ...jsonSign,
    categories: getCategoriesPath(path),
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
