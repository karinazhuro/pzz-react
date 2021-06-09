import React from 'react';

import {Consumer} from "../pizzas-service-context";
import Notification from "../notification";
import MakingAnOrder from "../makingAnOrder";

import './basket.scss';

const Basket = () => {
  const content = () => {
    return (
      <Consumer>
        {
          ({basket, countablePizzaList, onAddItem, onRemoveItem}) => {
            return basket.items.length === 0 ?
              <Notification/> :
              <MakingAnOrder/>;
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


export default Basket;