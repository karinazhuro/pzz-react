import React from "react";

import CartPizzaList from "../cart-pizza-list";
import CartSaucesList from "../cart-sauces-list";
import AddressDelivery from "../address-delivery";

import './making-an-order.scss';

const MakingAnOrder = () => {
	return (
		<React.Fragment>
			<h1 className='titleRegistration'>Оформление заказа</h1>
				<CartPizzaList/>
				<CartSaucesList/>
				<AddressDelivery/>
		</React.Fragment>
	)
};

export default MakingAnOrder;