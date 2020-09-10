import React from 'react';

import '../assets/styles/components/Loading.scss';

const Loading = () => {
  return (
    <div className='loading container pos-2 width-10'>
      <div className='loading__item' />
      <div className='loading__item' />
      <div className='loading__item' />
      <div className='loading__item' />
    </div>
  );
};

export default Loading;
