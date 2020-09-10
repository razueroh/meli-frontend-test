import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { getCurrency, formatAmount } from '../utils/price';
import getCondition from '../utils/condition';

import freeShippingIcon from '../assets/static/shipping-icon.png';
import '../assets/styles/components/Result.scss';

const Result = ({ result }) => {
  const { id, title, price, condition, location, picture: thumbnail, free_shipping: isFreeShipping } = result;

  return (
    <article className='result'>
      <Link to={`/items/${id}`} className='result__image-link'>
        <img src={thumbnail} alt={title} loading='lazy' className='result__thumbnail' />
      </Link>
      <div className='result__details-wrapper'>
        <div className='result__price'>
          <span className='result__price-currency'>{getCurrency(price.currency)}</span>
          <span className='result__price-value'>{formatAmount(price.amount)}</span>
          {isFreeShipping && <img src={freeShippingIcon} alt='Envío gratis' className='result__free-shipping' />}
        </div>
        <Link to={`/items/${id}`} className='result__description-link'>
          <div className='result__description'>{title}</div>
        </Link>
        <div className='result__condition'>{getCondition(condition)}</div>
      </div>
      <div className='result__location'>{location}</div>
    </article>
  );
};

Result.propTypes = {
  result: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    price: PropTypes.shape({
      amount: PropTypes.number.isRequired,
      currency: PropTypes.string.isRequired,
    }).isRequired,
    picture: PropTypes.string.isRequired,
    condition: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
    free_shipping: PropTypes.bool.isRequired,
  }).isRequired,
};

export default Result;
