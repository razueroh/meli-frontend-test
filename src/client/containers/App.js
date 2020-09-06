import React, { useState } from 'react';

import Search from '../components/Search';
import Header from '../components/Header';
import Main from '../components/Main';
import Breadcrumb from '../components/Breadcrumb';
import ResultList from './ResultList';

import '../assets/styles/containers/App.scss';
import { getItems } from '../api/meli';

const App = () => {
  const [searchResults, setSearchResults] = useState({
    categories: [],
    items: [],
  });

  const onSubmit = async (query) => {
    const { data } = await getItems(query);
    setSearchResults(data);
  };

  return (
    <>
      <Header>
        <Search onSubmit={onSubmit} />
      </Header>
      <Main>
        <Breadcrumb categories={searchResults.categories} />
        <ResultList results={searchResults.items} />
      </Main>
    </>
  );
};

export default App;
