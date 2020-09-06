import React from 'react';
import PropTypes from 'prop-types';

import Result from '../components/Result';
import '../assets/styles/containers/ResultList.scss';
import { getCurrency, formatAmount } from '../utils/price';

const ResultList = ({ results }) => {
  return (
    <div className='results pos-2 width-10'>
      {results.map((result) => {
        const {
          id,
          title,
          price,
          condition,
          location,
          picture: image,
          free_shipping: isFreeShipping,
        } = result;

        return (
          <Result
            key={`ml-result-${id}`}
            id={id}
            image={image}
            currency={getCurrency(price.currency)}
            value={formatAmount(price.amount)}
            title={title}
            condition={condition === 'new' ? 'Nuevo' : 'Usado'}
            location={location}
            isFreeShipping={isFreeShipping}
          />
        );
      })}
    </div>
  );
};

ResultList.defaultProps = {
  results: [],
};

ResultList.propTypes = {
  results: PropTypes.array,
};

export default ResultList;
