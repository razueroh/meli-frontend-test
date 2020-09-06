import React from 'react';
import PropTypes from 'prop-types';

import '../assets/styles/components/Header.scss';

const Header = ({ children }) => (
  <header className='header grid'>{children}</header>
);

Header.propTypes = {
  children: PropTypes.element.isRequired,
};

export default Header;
