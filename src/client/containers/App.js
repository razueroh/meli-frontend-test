import React, { useState, useEffect } from 'react';
import { Route, Switch, useHistory, useLocation, Redirect } from 'react-router-dom';

import Search from '../components/Search';
import Breadcrumb from '../components/Breadcrumb';
import ResultList from './ResultList';
import Details from './Details';

import '../assets/styles/containers/App.scss';
import { getItems } from '../api/meli';
import Message from '../components/Message';

const initialState = {
  categories: [],
  items: [],
};

const App = () => {
  const history = useHistory();
  const { search } = useLocation();
  const [value, setValue] = useState('');
  const [searchResults, setSearchResults] = useState(initialState);
  const [error, setError] = useState(false);

  const searchItems = async (query) => {
    try {
      const data = await getItems(query);
      if (data) {
        setSearchResults(data);
      }
    } catch (err) {
      setError(true);
    }
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
      <header className='header'>
        <Search value={value} onChange={(event) => setValue(event.target.value)} onSubmit={onSubmit} />
      </header>
      <main className='main grid'>
        <Breadcrumb categories={searchResults.categories} />
        <Switch>
          <Route exact path='/items'>
            {!error ? (
              <ResultList results={searchResults.items} />
            ) : (
              <Message
                title='Ha ocurrido un error'
                message='Tenemos algunos problemas encontrando tu producto. Por favor intenta más tarde.'
              />
            )}
          </Route>
          <Route exact path='/items/:id' component={Details} />
          <Redirect to='/' />
        </Switch>
      </main>
    </>
  );
};

export default App;
