import React from 'react';
import PropTypes from 'prop-types';

import '../assets/styles/components/Message.scss';

const messages = {
  404: {
    title: 'Lo sentimos',
    description: 'No encontramos el producto que buscas.',
  },
  500: {
    title: 'Ha ocurrido un error',
    description: 'Tenemos algunos problemas encontrando tu producto. Por favor intenta más tarde.',
  },
};

const Message = ({ error }) => {
  const message = messages[error] || 500;
  const { title, description } = message;

  return (
    <div className='message container pos-2 width-10'>
      <h1 className='message__header'>{title}</h1>
      <p className='message__body'>{description}</p>
    </div>
  );
};

Message.propTypes = {
  error: PropTypes.number.isRequired,
};

export default Message;
