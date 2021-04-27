import React from 'react';

import enumTranslations from '../../utils/enumTranslations';

const PizzaListItem = ({photo, title, variants}) => {
	const variant = variants.map((variant) => {
		return variant.size;
	});

	console.log(variant);

	return (
		<span>
			<img src={photo} alt={title} />
			<h3>{title}</h3>
			<PizzaInfo
				size={variant.map(item => {
					return item
				})}/>
		</span>
	)
};

const PizzaInfo = ({size, price, weight}) => {
	return (
		<div>
			<p>{enumTranslations(size)}</p>
			<p>{price}</p>
			<button onClick={() => {}}>В корзину</button>
			<p>{weight}</p>
		</div>
	)
};

export default PizzaListItem;