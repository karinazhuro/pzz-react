import React from 'react';

import {Consumer} from "../pizzas-service-context";
import enumTranslations from "../../utils/enumTranslations";
import Counter from "../counter";

import './basket.scss';

const Basket = () => {
	const message = <h2 className='empty'>Ваша корзина пуста.</h2>;

	const Order = ({countablePizzaList}) => {
		const pizzaItem = () => {
			return countablePizzaList.map(item => {
				const {id, title, variants} = item;

				variants.map(variant => {
					if (variant.count > 0) {
						const {size, count, price} = variant;

						return (
							<div className='pizza'>
								<p className='name'>{title}</p>
								<p className='size'>{enumTranslations(size)}</p>
								<div className='count'>
									<Counter id={id} size={size} count={count}/>
								</div>
								<p className='price'>{price}</p>
							</div>
						);
						// console.log(variant.count)
					}
				})
			});
		};

		return (
			<div>
				<h1 className='titleRegistration'>Оформление заказа</h1>
				<h2 className='titleOrder'>Ваш заказ</h2>
				<div className='order'>
					{pizzaItem()}
				</div>
			</div>
		)
	};

	return (
		<main className='basket'>
			<Consumer>
				{
					({basket, countablePizzaList}) => {
						return basket.items.length === 0 ? message : <Order countablePizzaList={countablePizzaList}/>;
					}
				}
			</Consumer>
		</main>
	)
}

export default Basket;