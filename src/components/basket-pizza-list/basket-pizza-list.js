import React from "react";
import {Consumer} from "../pizzas-service-context";

import './basket-pizza-list.scss';

const BasketPizzaList = () => {
	return (
		<Consumer>
			{
				({countablePizzaList, onAddItem, onRemoveItem, basket}) => {
					const items = basket.items;
					const collection = [];

					for (let i = 0; i < items.length; i++) {
						if (i === 0) {
							collection.push(items[0]);
							collection[0].count = 1;

							continue;
						}

						for (let j = 0; j < collection.length; j++) {
							if (items[i].id === collection[j].id &&
								items[i].size === collection[j].size) {
								collection[j].count += 1;
							} else {
								collection.push(items[i]);
								collection[i].count = 1;
							}
						}
					}

					console.log(collection);
				}
			}
		</Consumer>
	)
};

export default BasketPizzaList;