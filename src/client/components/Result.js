import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import freeShippingIcon from '../assets/static/shipping-icon.png';
import '../assets/styles/components/Result.scss';

const Result = ({
  id,
  image,
  currency,
  value,
  title,
  condition,
  location,
  isFreeShipping,
}) => {
  return (
    <article className='result'>
      <Link to={`/items/${id}`} className='result__image-link'>
        <img src={image} alt={title} className='result__thumbnail' />
      </Link>
      <div className='result-details__wrapper'>
        <div className='result__price'>
          <span className='result__price-currency'>{currency}</span>
          <span className='result__price-value'>{value}</span>
          {isFreeShipping && (
            <img
              src={freeShippingIcon}
              alt='Envío gratis'
              className='result__free-shipping'
            />
          )}
        </div>
        <Link to={`/items/${id}`} className='result__description-link'>
          <div className='result__description'>{title}</div>
        </Link>
        <div className='result__condition'>{condition}</div>
      </div>
      <div className='result__location'>{location}</div>
    </article>
  );
};

Result.propTypes = {
  id: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  currency: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  condition: PropTypes.string.isRequired,
  location: PropTypes.string.isRequired,
  isFreeShipping: PropTypes.bool.isRequired,
};

export default Result;
