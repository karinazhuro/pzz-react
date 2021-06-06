import React from 'react';

import './counter.scss';

const Counter = ({count, onPlusClick, onMinusClick}) => {
  return (
    <div className='counter'>
      <button className='minus'
              onClick={onMinusClick}>-
      </button>
      <p className='count'>{count}</p>
      <button className='plus'
              onClick={onPlusClick}>+
      </button>
    </div>
  );
};

export default Counter;