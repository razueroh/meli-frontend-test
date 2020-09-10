import React from 'react';
import PropTypes from 'prop-types';

import '../assets/styles/components/Product.scss';

const Product = ({ product }) => {
  const { picture, condition, soldQuantity, title, currency, amount, decimals, description } = product;

  return (
    <div className='product container pos-2 width-10'>
      <img src={picture} alt={title} loading='lazy' className='product__picture' />
      <div className='product__details'>
        <span className='product__condition'>{condition}</span>
        <span className='product__sold-quantity'>{`${soldQuantity} vendidos`}</span>
        <h2 className='product__title'>{title}</h2>
        <div className='product__price'>
          <span className='product__price-currency'>{currency}</span>
          <span className='product__price-value'>{amount}</span>
          <sup className='product__price-decimals'>{decimals}</sup>
        </div>
        <button type='button' className='product__buy-button'>
          Comprar
        </button>
      </div>
      <div className='product__description'>
        <h2 className='product__description-header'>Descripción del producto</h2>
        <p className='product__description-content'>{description}</p>
      </div>
    </div>
  );
};

Product.propTypes = {
  product: PropTypes.shape({
    picture: PropTypes.string.isRequired,
    condition: PropTypes.string.isRequired,
    soldQuantity: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    currency: PropTypes.string.isRequired,
    amount: PropTypes.string.isRequired,
    decimals: PropTypes.string,
    description: PropTypes.string.isRequired,
  }).isRequired,
};

export default Product;
