import React from 'react';

import basketOrderApply from "./cart-order-apply.svg";

const OrderApply = () => {
	return (
		<React.Fragment>
			<h2 className='textOrderApply'>Ваш заказ принят</h2>
			<img src={basketOrderApply} alt="Пицца Лиисцца"/>
		</React.Fragment>
	)
};

export default OrderApply;