import React from 'react';

import translationSizes from "../../utils/translation-sizes";
import {Consumer} from "../pizzas-service-context";
import ContentCounter from "../content-counter";
import denominationPrice from "../../utils/denominationPrice";

import './pizza-list-item.scss';

const PizzaListItem = ({product}) => {
	const {photo, title, description} = product;
	const renderVariants = (product) => {
		const {id, variants} = product;

		return variants.map(variant => {
			const {size, price, weight, quantity} = variant;

			return <PizzaVariant key={size}
													 id={id}
													 size={size}
													 price={price}
													 weight={weight}
													 quantity={quantity}
													 product={product}/>
		});
	};

	return (
		<React.Fragment>
			<img src={photo} alt={title}/>
			<div className='pizzaInfo'>
				<h3 className='title'>{title}</h3>
				{renderVariants(product)}
			</div>
			<p className='desc'>{description}</p>
		</React.Fragment>
	);
};

const PizzaVariant = ({size, price, weight, quantity, id, product}) => {
	const {type, title} = product;
	const productData = {
		type,
		id,
		size,
		title,
		price,
	};

	return (
		<Consumer>
			{
				({onAddItem, onRemoveItem}) => {
					return (
						<div className='variant'>
							<div className='infoAboutVariant'>
								<p className='size'>{translationSizes[size]}</p>
								<p className='price'>{denominationPrice(price)}</p>
								<p className='weight'>{weight}</p>
							</div>
							<div className='countPizzas'>
								{
									<ContentCounter quantity={quantity}
																	onAddItem={onAddItem}
																	onRemoveItem={onRemoveItem}
																	productData={productData}/>
								}
							</div>
						</div>
					)
				}
			}
		</Consumer>
	);
};

export default PizzaListItem;