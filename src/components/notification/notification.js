import React from 'react';

import basketOrderApply from './basket-order-apply.svg';
import './notification.scss';

const Notification = () => {
  // const empty = <h2 className='empty'>Ваша корзина пуста.</h2>;
  const orderApply = (
    <React.Fragment>
      <h2 className='orderApply'>Ваш заказ принят</h2>
      <img className='imgOrderApply'
           src={basketOrderApply} alt="Пицца Лиисцца"/>
    </React.Fragment>
  );

  return (
    <div className='wrapper'>
      {orderApply}
    </div>
  )
};

export default Notification;