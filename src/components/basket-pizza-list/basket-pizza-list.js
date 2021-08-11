import React from "react";
import {Consumer} from "../pizzas-service-context";

import BasketPizzaListItem from "../basket-pizza-list-item";

import './basket-pizza-list.scss';

const BasketPizzaList = () => {
	const renderItem = (basketPizzaList) => {

		return basketPizzaList.map(pizza => {
			const {id, size} = pizza;

			return (
				<BasketPizzaListItem key={`${id}-${size}`}
														 product={pizza}/>
			)
		})
	};

	return (
		<div className='pizzas'>
			<Consumer>
				{
					({basketPizzaList}) => {
						return renderItem(basketPizzaList)
					}
				}
			</Consumer>
		</div>
	)
};

export default BasketPizzaList;