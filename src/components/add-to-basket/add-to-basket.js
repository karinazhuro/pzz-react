import React from "react";

import './add-to-basket.scss';

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