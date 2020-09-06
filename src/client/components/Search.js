import React, { useState } from 'react';
import PropTypes from 'prop-types';

import '../assets/styles/components/Search.scss';
import logo from '../assets/static/logo-ml.png';

const Search = ({ onSubmit }) => {
  const [query, setQuery] = useState('');

  return (
    <div className='search-box pos-2 width-10'>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          onSubmit(query);
        }}
        className='search-box__form'
      >
        <img
          src={logo}
          alt='Logo de Mercado Libre'
          className='search-box__logo'
        />
        <input
          type='text'
          className='search-box__input'
          placeholder='Nunca dejes de comprar'
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
        <button
          type='submit'
          aria-label='Search'
          className='search-box__button'
        />
      </form>
    </div>
  );
};

Search.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default Search;
