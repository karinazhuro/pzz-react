import React from "react";

import {Consumer} from "../pizzas-service-context";
import translationSizes from "../../utils/translation-sizes";
import Counter from "../counter";

import './basket-pizza-list.scss';

const BasketPizzaList = () => {
	const renderBasketPizzaList = (countablePizzaList, item, onAddItem, onRemoveItem) => {
		const {id, size, title, price} = item;
		const count = 0;

		console.log(item)

		return (
			<div className='basketPizza' key={`${id}${size}`}>
				<p className='title'>{title}</p>
				<div className='variants'>
					<p className='size'>{translationSizes[size]}</p>
					{/*<Counter count={count}*/}
					{/*				 onPlusClick={() => onAddItem(item)}*/}
					{/*				 onMinusClick={() => onRemoveItem(item)}/>*/}
					<p className='price'>{(price / 10000).toFixed(2)}</p>
				</div>
			</div>
		)
	};

	return (
		<Consumer>
			{
				({countablePizzaList, basket, onAddItem, onRemoveItem}) => {
					const {items} = basket;

					return items.map(item => renderBasketPizzaList(countablePizzaList, item, onAddItem, onRemoveItem));
				}}
		</Consumer>
	)
};

export default BasketPizzaList;