import React from "react";
import {Consumer} from "../pizzas-service-context";

import './basket-pizza-list.scss';

const BasketPizzaList = () => {
  const isEqualProducts = (product1, product2) => {
    return product1.id === product2.id &&
      product1.size === product2.size
  };

  const combinePizzas = (basket) => {
		const items = basket.items;
		const collection = [];

		for (let i = 0; i < items.length; i++) {
			let isExist = false;

			for (let j = 0; j < collection.length; j++) {
				if (isEqualProducts(items[i], collection[j])) {
					collection[j].count += 1;
					isExist = true;
					break;
				}
			}

			if (!isExist) {
				collection.push({
					...items[i],
					count: 1,
				});
			}
		}
	};

  const renderBasketPizzaList = () => {

	};

  return (
    <Consumer>
      {
        ({onAddItem, onRemoveItem, basket}) => {
        	combinePizzas(basket);
        }
      }
    </Consumer>
  )
};

export default BasketPizzaList;