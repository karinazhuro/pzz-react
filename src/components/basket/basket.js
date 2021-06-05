import React from 'react';

import {Consumer} from "../pizzas-service-context";
import enumTranslations from "../../utils/enumTranslations";
import Counter from "../counter";
import Notification from "../notification";

import './basket.scss';

const Basket = () => {
  const Order = ({countablePizzaList}) => {
    const pizzaItem = () => {
      return countablePizzaList.map(item => {
        const {id, title, variants} = item;

        return variants.map(variant => {
          if (variant.count > 0) {
            const {size, count, price} = variant;

            return (
              <div className='pizza'>
                <p className='title'>{title}</p>
                <div className='variants'>
									<div className='count'>
										<Counter id={id} size={size} count={count}/>
									</div>
									<p className='size'>{enumTranslations(size)}</p>
                  <p className='price'>{price}</p>
                </div>
              </div>
            );
          }
        })
      });
    };

    return (
      <div className='order'>
        <h1 className='titleRegistration'>Оформление заказа</h1>
        <h2 className='titleOrder'>Ваш заказ</h2>
        <div className='items'>
          {pizzaItem()}
        </div>
      </div>
    )
  };

  const content = () => {
    return (
      <Consumer>
        {
          ({basket, countablePizzaList}) => {
            return basket.items.length === 0 ?
              <Notification/> : <Order countablePizzaList={countablePizzaList}/>;
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