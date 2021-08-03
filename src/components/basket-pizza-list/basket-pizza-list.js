import React from "react";
import {Consumer} from "../pizzas-service-context";

import translationSizes from "../../utils/translation-sizes";

import './basket-pizza-list.scss';
import Counter from "../counter";

const BasketPizzaList = () => {
	const renderBasketPizzasList = (basketPizzaList, onAddItem, onRemoveItem) => {
		console.log(basketPizzaList)

		return basketPizzaList.map(pizza => {
			const {id, title, size, quantity, price} = pizza;

			return (
				<div className='basketPizza' key={`${id}-${size}`}>
					<h3 className='title'>{title}</h3>
					<div className='details'>
						<p className='size'>{translationSizes[size]}</p>
						<Counter quantity={quantity}
										 onPlusClick={onAddItem}
										 onMinusClick={onRemoveItem}/>
						<p className='price'>{price}</p>
					</div>
				</div>
			)
		})
	};

	return (
		<Consumer>
			{
				({onAddItem, onRemoveItem, basketPizzaList}) => {
					return renderBasketPizzasList(basketPizzaList, onAddItem, onRemoveItem);
				}
			}
		</Consumer>
	)
};

export default BasketPizzaList;