const getCategoriesPath = (path) => {
  return (path || []).map((step) => step.name);
};

const getCategoriesFromFilters = (filters) => {
  const categoryFilter = (filters || []).find(({ id }) => id === 'category');
  let categories = [];

  if (categoryFilter && categoryFilter.values.length > 0) {
    if (categoryFilter.values[0].path_from_root) {
      categories = getCategoriesPath(categoryFilter.values[0].path_from_root);
    } else {
      categories = getCategoriesPath(
        categoryFilter.values.slice(0, 2).sort((a, b) => (a.results < b.results ? 1 : -1)),
      );
    }
  }

  return categories;
};

const getCategory = (filters, availableFilters) => {
  let categories = getCategoriesFromFilters(filters);

  if ((categories || []).length < 1 && (availableFilters || []).length > 0) {
    categories = getCategoriesFromFilters(availableFilters);
  }

  return categories;
};

const getPrice = (price) => {
  const [amount, decimals] = price.toString().split('.');
  return [parseInt(amount, 10), parseInt(decimals, 10)];
};

module.exports = {
  getCategory,
  getCategoriesPath,
  getPrice,
};
