const getCategory = (filters) => {
  const categoryFilters = (filters || []).filter(
    ({ id }) => id === 'category'
  )[0];
  const categories = categoryFilters
    ? categoryFilters.values.sort((a, b) => (a.results < b.results ? 1 : -1))
    : [];

  return [categories[0]] || [];
};

const getPrice = (price) => {
  return price.toString().split('.');
};

module.exports = {
  getCategory,
  getPrice,
};
