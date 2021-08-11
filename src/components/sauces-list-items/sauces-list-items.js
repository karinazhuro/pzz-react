import React from "react";

import ContentCounter from "../content-counter";
import {Consumer} from "../pizzas-service-context";
import EnumSizes from "../../utils/enum-sizes";
import denominationPrice from "../../utils/denominationPrice";

import './sauces-list-items.scss';

const SaucesListItems = ({product}) => {
	const {id, photo, title, price} = product;
	const productData = {
		id,
		size: EnumSizes["big"],
		title,
		price,
	};

	return (
		<React.Fragment>
			<img src={photo} alt={title}/>
			<h3 className='sauceTitle'>{title}</h3>
			<p className='saucePrice'>{denominationPrice(price)}</p>
			<Consumer>
				{
					({onAddItem, onRemoveItem}) => {
						return <ContentCounter quantity={0}
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