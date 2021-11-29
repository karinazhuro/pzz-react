import React from 'react';

import {Consumer} from "../pizzas-service-context";
import CartEmpty from "../cart-empty";
import MakingAnOrder from "../making-an-order";

import './cart.scss';

const Cart = () => {
  const content = () => {
    return (
      <Consumer>
        {
          ({basket}) => {
            return basket.items.length === 0 ?
              <CartEmpty/> : <MakingAnOrder/>;
          }
        }
      </Consumer>
    )
  };

  return (
    <main className='basket'>
      {content()}
    </main>
  )
};


export default Cart;