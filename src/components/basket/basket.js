import React from 'react';

import {Consumer} from "../pizzas-service-context";

const Basket = () => {
	const message = <h2 className='empty'>Ваша корзина пуста.</h2>;
	const order = <p>Order</p>;

	return (
		<main>
			<Consumer>
				{
					({basket}) => {
						return basket.items.length === 0 ? message : order;
					}
				}
			</Consumer>
		</main>
	)
}

export default Basket;