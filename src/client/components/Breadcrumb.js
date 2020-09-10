import React from 'react';
import PropTypes from 'prop-types';

import '../assets/styles/components/Breadcrumb.scss';
import { useRouteMatch } from 'react-router-dom';

const Breadcrumb = ({ categories }) => {
  const { isExact } = useRouteMatch('/');

  return (
    <div className='breadcrumb pos-2 width-10'>
      {!isExact &&
        categories.map((category) => (
          <span key={category} className='breadcrumb__category'>
            {category}
          </span>
        ))}
    </div>
  );
};

Breadcrumb.defaultProps = {
  categories: [],
};

Breadcrumb.propTypes = {
  categories: PropTypes.array,
};

export default Breadcrumb;
