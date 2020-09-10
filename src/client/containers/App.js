import React, { useState, useEffect } from 'react';
import { Route, Switch, useHistory, useLocation, Redirect } from 'react-router-dom';

import Search from '../components/Search';
import Breadcrumb from '../components/Breadcrumb';
import ResultList from './ResultList';
import Details from './Details';

import '../assets/styles/containers/App.scss';
import { getItems } from '../api/meli';
import Message from '../components/Message';
import Loading from '../components/Loading';

const component = {
  loading: () => <Loading />,
  error: (error) => <Message error={error} />,
  success: (results) => <ResultList results={results} />,
};

const getState = ({ state, data }) => component[state](data);

const App = () => {
  const history = useHistory();
  const { search } = useLocation();
  const [value, setValue] = useState('');
  const [currentCategories, setCurrentCategories] = useState([]);
  const [currentState, setCurrentState] = useState({ state: 'loading' });

  const searchItems = async (query) => {
    setCurrentState({ state: 'loading' });
    setCurrentCategories([]);
    try {
      const { items, categories } = await getItems(query);
      if (items && items.length > 0) {
        setCurrentState({ state: 'success', data: items });
      } else {
        setCurrentState({ state: 'error', data: 404 });
      }

      setCurrentCategories([...new Set(categories)]);
    } catch (err) {
      console.log(err);
      setCurrentState({ state: 'error', data: err });
      setCurrentCategories([]);
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
        <Breadcrumb categories={currentCategories} />
        <Switch>
          <Route exact path='/items'>
            {getState(currentState)}
          </Route>
          <Route exact path='/items/:id' component={Details} />
          <Redirect to='/' />
        </Switch>
      </main>
    </>
  );
};

export default App;
