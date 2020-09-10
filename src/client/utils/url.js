const getSearchParams = (search) => {
  const searchParams = new URLSearchParams(search);

  return searchParams.get('search');
};

export default getSearchParams;
