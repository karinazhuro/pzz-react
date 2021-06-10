import React from "react";

import BasketPizzaList from "../basket-pizza-list";

import './makingAnOrder.scss';

const MakingAnOrder = () => {
	return (
		<div className='order'>
			<h1 className='titleRegistration'>Оформление заказа</h1>
			<h2 className='titleOrder'>Ваш заказ</h2>
			<div className='pizzas'>
				<BasketPizzaList/>
			</div>
		</div>
	)
};

export default MakingAnOrder;