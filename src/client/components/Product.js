import React from 'react';
import PropTypes from 'prop-types';

import '../assets/styles/components/Product.scss';

const Product = ({ picture, condition, soldQuantity, title, currency, price, decimals, description }) => (
  <div className='product pos-2 width-10'>
    <img src={picture} alt={title} className='product__picture' />
    <div className='product__details'>
      <span className='product__condition'>{condition}</span>
      <span className='product__sold-quantity'>{`${soldQuantity} vendidos`}</span>
      <h2 className='product__title'>{title}</h2>
      <div className='product__price'>
        <span className='product__price-currency'>{currency}</span>
        <span className='product__price-value'>{price}</span>
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

Product.defaultProps = {
  decimals: '00',
};

Product.propTypes = {
  picture: PropTypes.string.isRequired,
  condition: PropTypes.string.isRequired,
  soldQuantity: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  currency: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
  decimals: PropTypes.string,
  description: PropTypes.string.isRequired,
};

export default Product;
