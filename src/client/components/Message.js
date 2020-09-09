import React from 'react';
import PropTypes from 'prop-types';

import '../assets/styles/components/Message.scss';

const Message = ({ title, message }) => {
  return (
    <div className='message container pos-2 width-10'>
      <h1 className='message__header'>{title}</h1>
      <p className='message__body'>{message}</p>
    </div>
  );
};

Message.propTypes = {
  title: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
};

export default Message;
