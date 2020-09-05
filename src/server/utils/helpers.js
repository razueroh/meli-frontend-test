const getCategory = (filters) => {
  const categoryFilters = (filters || []).filter(
    ({ id }) => id === 'category',
  )[0];
  const categories = categoryFilters
    ? categoryFilters.values.sort((a, b) => (a.results < b.results ? 1 : -1))
    : [];

  return [categories[0]] || [];
};

const getPrice = (price) => {
  const [amount, decimals] = price.toString().split('.');
  return [parseInt(amount, 10), parseInt(decimals, 10)];
};

module.exports = {
  getCategory,
  getPrice,
};
