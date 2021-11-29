import './counter.scss';

const Counter = ({quantity, onPlusClick, onMinusClick}) => {
  return (
    <div className='counter'>
      <button className='minus'
              onClick={onMinusClick}>-
      </button>
      <p className='quantity'>{quantity}</p>
      <button className='plus'
              onClick={onPlusClick}>+
      </button>
    </div>
  );
};

export default Counter;