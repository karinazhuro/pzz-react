import React from "react";

import BasketPizzaList from "../basket-pizza-list";
import BasketSaucesList from "../basket-sauces-list";
import AddressDelivery from "../address-delivery";

import './making-an-order.scss';

const MakingAnOrder = () => {
	return (
		<React.Fragment>
			<h1 className='titleRegistration'>Оформление заказа</h1>
				<BasketPizzaList/>
				<BasketSaucesList/>
				<AddressDelivery/>
		</React.Fragment>
	)
};

export default MakingAnOrder;