import React from "react";
import {Consumer} from "../pizzas-service-context";

import translationSizes from "../../utils/translation-sizes";

import './basket-pizza-list.scss';

const BasketPizzaList = () => {
	const renderBasketPizzasList = (basketPizzaList) => {
		console.log(basketPizzaList)
		return basketPizzaList.map(pizza => {
			const {id, title, size, count} = pizza;

			return (
				<div className='basketPizza' key={`${id}-${size}`}>
					<h3 className='title'>{title}</h3>
					<p className='size'>{translationSizes[size]}</p>
					<p className='quantity'>{count}</p>
				</div>
			)
		})
	};

	return (
		<Consumer>
			{
				({onAddItem, onRemoveItem, basketPizzaList}) => {
					console.log(basketPizzaList)

					return renderBasketPizzasList(basketPizzaList);
				}
			}
		</Consumer>
	)
};

export default BasketPizzaList;