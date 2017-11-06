import React from 'react';
import { number } from 'prop-types';

const UpOrDown = ({ prev, current }) => {
  if (current < prev) {
    return <span className="up">↥{prev - current}</span>;
  }

  return <span className="down">↧{current - prev}</span>;
};

UpOrDown.propTypes = {
  prev: number.isRequired,
  current: number.isRequired,
};

export default UpOrDown;
