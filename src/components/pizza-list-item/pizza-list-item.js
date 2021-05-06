import React, {Component} from 'react';

import enumTranslations from '../../utils/enumTranslations';
import {Consumer} from "../pizzas-service-context";

import './pizza-list-item.css';

export default class PizzaListItem extends Component {
	state = {
		pizzasList: [],
	}
		render() {
		const {id, photo, title, variants} = this.props;
		const variant = variants.map((variant) => {
			return <PizzaVariant key={variant.size}
													 id={id}
													 variant={variant}/>
		});

		return (
			<div>
				<img src={photo} alt={title}/>
				<div className='pizzaInfo'>
					<h3>{title}</h3>
					{variant}
				</div>
			</div>
		);
	};
};

const PizzaVariant = ({id, variant}) => {
	const {size, price, weight} = variant;

	return (
		<div className='variant'>
			<div className='info'>
				<p>{enumTranslations(size)}</p>
				<p>{price}</p>
				<p>{weight}</p>
			</div>
			<div className='countPizzas'>
			</div>
		</div>
	);
};

const Counter = () => {
	return (
		<div className='counter'>
			<button className='plus'
							onClick={() => {
							}}>+
			</button>
			<p>1</p>
			<button className='minus'
							onClick={() => {
							}}>-
			</button>
		</div>
	);
};

const AddToCart = ({id, size}) => {
	const addToCart = (id, size) => {
	};

	return (
		<button className='addToCart'
						id={id}
						sizes={size}
						onClick={() => addToCart(id, size)}>В корзину</button>
	);
};