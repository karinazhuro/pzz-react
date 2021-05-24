import React, {Component} from 'react';

import enumTranslations from '../../utils/enumTranslations';
import {Consumer} from '../pizzas-service-context';

import './pizza-list-item.css';

export default class PizzaListItem extends Component {
	renderVariants(variants) {
		return variants.map(variant => {
			return <PizzaVariant key={variant.size}
													 size={variant.size}
													 price={variant.price}
													 weight={variant.weight}
													 count={variant.count}
			/>
		});
	};

	render() {
		const {photo, title, variants, description} = this.props;

		return (
			<div>
				<img src={photo} alt={title}/>
				<div className='pizzaInfo'>
					<h3>{title}</h3>
					{this.renderVariants(variants)}
				</div>
				<p className='desc'>{description}</p>
			</div>
		);
	};
};

const Counter = () => {
	return (
		<div className='counter'>
			<button className='plus'
							onClick={() => {
							}}>+
			</button>
			<p>{}</p>
			<button className='minus'
							onClick={() => {
							}}>-
			</button>
		</div>
	);
};

const AddToCart = ({id, size}) => {
	const addToCart = (id, size) => {};

	return (
		<button className='addToCart'
						id={id}
						sizes={size}
						onClick={() => addToCart(id, size)}>В корзину</button>
	);
};

const PizzaVariant = ({size, price, weight, count}) => {
	const content = count === 0 ? <AddToCart/> : <Counter count={count}/>;

	return (
		<div className='variant'>
			<div>
				<p>{enumTranslations(size)}</p>
				<p>{price}</p>
				<p>{weight}</p>
			</div>
			<div className='countPizzas'>
				{content}
			</div>
		</div>
	);
};