import React from 'react';
import PropTypes from 'prop-types';

import '../assets/styles/components/Breadcrumb.scss';

const Breadcrumb = ({ categories }) => (
  <div className='breadcrumb pos-2 width-10'>
    {categories.map((category, idx) => (
      <span key={category} className='breadcrumb__category'>
        {category}
      </span>
    ))}
  </div>
);

Breadcrumb.defaulProps = {
  categories: [],
};

Breadcrumb.propTypes = {
  categories: PropTypes.array,
};

export default Breadcrumb;
