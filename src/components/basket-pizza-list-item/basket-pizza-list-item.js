import React from "react";
import {Consumer} from "../pizzas-service-context";

import translationSizes from "../../utils/translation-sizes";
import ContentCounter from "../content-counter";

import './basket-pizza-list-item.js.scss';
import denominationPrice from "../../utils/denominationPrice";

const BasketPizzaListItem = ({product}) => {
	const {id, size, title, price, quantity} = product;
	const productData = {
		id,
		size,
		title,
		price,
	};

	return (
	<div className='basketPizza'>
		<h3 className='title'>{title}</h3>
		<div className='details'>
			<p className='size'>{translationSizes[size]}</p>
				<Consumer>
					{
						({onAddItem, onRemoveItem}) => {
							return <ContentCounter quantity={quantity}
															onAddItem={onAddItem}
															onRemoveItem={onRemoveItem}
															productData={productData}/>
						}
					}
				</Consumer>
			<p className='price'>{denominationPrice(price * quantity)}</p>
		</div>
	</div>
	)
}

export default BasketPizzaListItem;