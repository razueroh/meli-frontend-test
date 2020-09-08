import axios from 'axios';

const config = {
  timeout: 3000,
};

const http = axios.create(config);

const getItems = (query) => {
  return http.get(`/api/items?q=${encodeURIComponent(query)}`);
};

const getItem = (id) => {
  return http.get(`/api/items/${id}`);
};

export { getItems, getItem };
