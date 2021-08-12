import React from "react";

import BasketPizzaList from "../basket-pizza-list";
import BasketSaucesList from "../basket-sauces-list";

import './makingAnOrder.scss';

const MakingAnOrder = () => {
	return (
		<div className='order'>
			<h1 className='titleRegistration'>Оформление заказа</h1>
			<h2 className='titleOrder'>Ваш заказ</h2>
				<BasketPizzaList/>
				<BasketSaucesList/>
		</div>
	)
};

export default MakingAnOrder;