import React from "react";

import './addToBasket.scss';

const AddToBasket = ({id, size, onAddItem}) => {
	return (
		<button className='addToCart'
						id={id}
						sizevariant={size}
						onClick={() => onAddItem(id, size)}>
			В корзину</button>
	);
};

export default AddToBasket;