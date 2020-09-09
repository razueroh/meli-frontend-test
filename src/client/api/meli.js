const getStatus = (response) => {
  if (response.status >= 200 && response.status < 300) {
    return Promise.resolve(response);
  }

  return Promise.reject(response.status);
};

const getJSON = (response) => response.json();

const get = (url) => {
  return fetch(url).then(getStatus).then(getJSON);
};

const getItems = async (query) => {
  return get(`/api/items?q=${encodeURIComponent(query)}`);
};

const getItem = (id) => {
  return get(`/api/items/${id}`);
};

export { getItems, getItem };
