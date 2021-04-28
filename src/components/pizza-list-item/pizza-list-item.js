import React from 'react';

import enumTranslations from '../../utils/enumTranslations';

const PizzaListItem = ({id, photo, title, variants}) => {
	const variant = variants.map((variant) => <PizzaInfo variants={variant}/>);

	return (
		<div key={id} className='PizzaListItem'>
			<img src={photo} alt={title}/>
			<h3>{title}</h3>
			{variant}
		</div>
	)
};

const PizzaInfo = ({variants}) => {
	const {size, price, weight} = variants;

	return (
		<div className='PizzaInfo'>
			<p>{enumTranslations(size)}</p>
			<p>{price}</p>
			<button onClick={() => {
			}}>В корзину
			</button>
			<p>{weight}</p>
		</div>
	)
};

export default PizzaListItem;