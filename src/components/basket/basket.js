import React from 'react';

import {Consumer} from "../pizzas-service-context";
import enumTranslations from "../../utils/enumTranslations";
import Counter from "../counter";
import Notification from "../notification";
import SaucesList from "../saucesList";

import './basket.scss';

const Basket = () => {
  const Order = ({countablePizzaList, onAddItem, onRemoveItem}) => {
    const pizzaItem = () => {
      return countablePizzaList.map(item => {
        const {id, title, variants} = item;

        return variants.map(variant => {
          if (variant.count > 0) {
            const {size, count, price} = variant;

            return (
              <div className='pizza' key={`${id}${size}`}>
                <p className='title'>{title}</p>
                <div className='variants'>
                  <p className='size'>{enumTranslations(size)}</p>
                  <Counter count={count}
                           onMinusClick={() => onRemoveItem(id, size)}
                           onPlusClick={() => onAddItem(id, size)}/>
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
				<SaucesList/>
			</div>
    )
  };

  const content = () => {
    return (
      <Consumer>
        {
          ({basket, countablePizzaList, onAddItem, onRemoveItem}) => {
            return basket.items.length === 0 ?
              <Notification/> :
              <Order countablePizzaList={countablePizzaList}
                     onAddItem={onAddItem}
                     onRemoveItem={onRemoveItem}/>;
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