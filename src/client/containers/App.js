import React, { useState, useEffect } from 'react';
import { Route, Switch, useHistory, Redirect, useLocation } from 'react-router-dom';

import Search from '../components/Search';
import ResultList from './ResultList';
import Details from './Details';
import getSearchParams from '../utils/url';

import '../assets/styles/containers/App.scss';

const App = () => {
  const history = useHistory();
  const { search } = useLocation();
  const [value, setValue] = useState('');

  const onSubmit = () => {
    history.push(`/items?search=${value}`);
  };

  useEffect(() => {
    const searchParam = getSearchParams(search);

    if (searchParam) {
      setValue(searchParam);
    }
  }, [search]);

  return (
    <>
      <header className='header'>
        <Search value={value} onChange={(event) => setValue(event.target.value)} onSubmit={onSubmit} />
      </header>
      <main className='main grid'>
        <Switch>
          <Route exact path='/items' component={ResultList} />
          <Route exact path='/items/:id' component={Details} />
          <Redirect to='/' />
        </Switch>
      </main>
    </>
  );
};

export default App;
