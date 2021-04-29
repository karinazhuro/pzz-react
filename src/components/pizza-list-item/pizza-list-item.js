import React from 'react';

import enumTranslations from '../../utils/enumTranslations';

import './pizza-list-item.css';

const PizzaListItem = ({id, photo, title, variants}) => {
	const variant = variants.map((variant) => <PizzaInfo id={id} variants={variant}/>);

	return (
		<div key={id}>
			<img src={photo} alt={title}/>
			<div className='pizzaInfo'>
				<h3>{title}</h3>
				{variant}
			</div>
		</div>
	)
};

const PizzaInfo = ({id, variants}) => {
	const {size, price, weight} = variants;

	const addToCart = (id, size) => {

	};

	return (
		<div className='variant'>
			<div className='info'>
				<p>{enumTranslations(size)}</p>
				<p>{price}</p>
				<p>{weight}</p>
			</div>
			<div className='countPizzas'>
				<div className='counter'>
					<button className='plus'
						onClick={() => {}}>+</button>
					<p>1</p>
					<button className='minus'
									onClick={() => {}}>-</button>
				</div>
				<button className='addToCart'
								id={id}
								sizes={size}
								onClick={() => addToCart(id, size)}>В корзину</button>
			</div>
		</div>
	)
};

export default PizzaListItem;