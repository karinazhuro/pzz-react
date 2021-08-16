import React from "react";

import BasketPizzaList from "../basket-pizza-list";
import BasketSaucesList from "../basket-sauces-list";
import AddressDelivery from "../address-delivery";

import './makingAnOrder.scss';

const MakingAnOrder = () => {
	return (
		<React.Fragment>
			<h1 className='titleRegistration'>Оформление заказа</h1>
			<h2 className='titleOrder'>Ваш заказ</h2>
				<BasketPizzaList/>
				<BasketSaucesList/>
				<AddressDelivery/>
		</React.Fragment>
	)
};

export default MakingAnOrder;