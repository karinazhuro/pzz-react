import React from 'react';

import PizzaVariant from "../pizza-variant";

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

export default PizzaListItem;