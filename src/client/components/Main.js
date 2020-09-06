import React from 'react';
import PropTypes from 'prop-types';

import '../assets/styles/components/Main.scss';

const Main = ({ children }) => <main className='main grid'>{children}</main>;

Main.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
};

export default Main;
