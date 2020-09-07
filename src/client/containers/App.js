import React, { useState, useEffect } from 'react';
import { Route, Switch, useHistory, useLocation, Redirect } from 'react-router-dom';

import Search from '../components/Search';
import Header from '../components/Header';
import Main from '../components/Main';
import Breadcrumb from '../components/Breadcrumb';
import ResultList from './ResultList';
import Details from './Details';

import '../assets/styles/containers/App.scss';
import { getItems } from '../api/meli';

const initialState = {
  categories: [],
  items: [],
};

const App = () => {
  const history = useHistory();
  const { search } = useLocation();
  const [value, setValue] = useState('');
  const [searchResults, setSearchResults] = useState(initialState);

  const searchItems = async (query) => {
    const { data } = await getItems(query);
    setSearchResults(data);
  };

  const onSubmit = () => {
    searchItems(value);
    history.push(`/items?search=${value}`);
  };

  useEffect(() => {
    const queryParams = new URLSearchParams(search);
    const searchParam = queryParams.get('search');

    if (searchParam) {
      searchItems(searchParam);
      setValue(searchParam);
    }
  }, [search]);

  return (
    <>
      <Header>
        <Search value={value} onChange={(event) => setValue(event.target.value)} onSubmit={onSubmit} />
      </Header>
      <Main>
        <Breadcrumb categories={searchResults.categories} />
        <Switch>
          <Route exact path='/items'>
            <ResultList results={searchResults.items} />
          </Route>
          <Route exact path='/items/:id' component={Details} />
          <Redirect to='/' />
        </Switch>
      </Main>
    </>
  );
};

export default App;
