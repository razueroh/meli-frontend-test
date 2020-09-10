import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';

import Breadcrumb from '../components/Breadcrumb';
import Result from '../components/Result';
import Message from '../components/Message';
import Loading from '../components/Loading';
import { getItems } from '../api/meli';
import getSearchParams from '../utils/url';

import '../assets/styles/containers/ResultList.scss';

const component = {
  loading: () => <Loading />,
  error: (error) => <Message error={error} />,
  success: (results) => (
    <div className='results container pos-2 width-10'>
      {results.map((result) => {
        return <Result key={`ml-result-${result.id}`} result={result} />;
      })}
    </div>
  ),
};

const getState = ({ state, data }) => component[state](data);

const ResultList = ({ results }) => {
  const { search } = useLocation();
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

  useEffect(() => {
    const searchParam = getSearchParams(search);

    if (searchParam) {
      searchItems(searchParam);
    }
  }, [search]);

  return (
    <>
      <Breadcrumb categories={currentCategories} />
      {getState(currentState)}
    </>
  );
};

ResultList.defaultProps = {
  results: [],
};

ResultList.propTypes = {
  results: PropTypes.array,
};

export default ResultList;
