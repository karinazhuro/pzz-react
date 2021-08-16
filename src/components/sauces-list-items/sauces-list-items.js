import React from "react";

import {Consumer} from "../pizzas-service-context";
import ContentCounter from "../content-counter";
import denominationPrice from "../../utils/denominationPrice";

import './sauces-list-items.scss';

const SaucesListItems = ({product}) => {
	const {type, id, size, photo, title, price, quantity} = product;

	const productData = {
		type,
		id,
		size,
		title,
		price,
		quantity,
	};

	return (
		<React.Fragment>
			<img src={photo} alt={title}/>
			<h3 className='sauceTitle'>{title}</h3>
			<p className='saucePrice'>{denominationPrice(price)}</p>
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
		</React.Fragment>
	);
};

export default SaucesListItems;