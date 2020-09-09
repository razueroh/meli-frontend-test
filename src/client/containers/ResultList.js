import React from 'react';
import PropTypes from 'prop-types';

import Result from '../components/Result';
import '../assets/styles/containers/ResultList.scss';

const ResultList = ({ results }) => {
  return (
    <div className='results container pos-2 width-10'>
      {results.map((result) => {
        return <Result key={`ml-result-${result.id}`} result={result} />;
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
