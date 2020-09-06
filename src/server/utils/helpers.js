const getCategory = (filters) => {
  const category = (filters || []).filter(({ id }) => id === 'category')[0];
  const categories =
    category && category.values
      ? category.values[0].path_from_root.map((step) => step.name)
      : [];

  return categories;
};

const getPrice = (price) => {
  const [amount, decimals] = price.toString().split('.');
  return [parseInt(amount, 10), parseInt(decimals, 10)];
};

module.exports = {
  getCategory,
  getPrice,
};
