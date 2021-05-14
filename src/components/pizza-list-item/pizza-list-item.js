import React, {Component} from 'react';

import enumTranslations from '../../utils/enumTranslations';
import {Consumer} from '../pizzas-service-context';

import './pizza-list-item.css';

export default class PizzaListItem extends Component {
	// state = {
	// 	count: 0,
	// };

	render() {
		const {id, photo, title, variants} = this.props;

		const quantityPizzas = variants.map(variant => {
			return {
				...variant,
				count: 0,
				// count: this.state.count,
			};
		});

		// const variantsPizzas = {
		// 	id,
		// 	...quantityPizzas,
		// };

		const renderVariants = (variants) => {
			return variants.map(variant => {
				return <PizzaVariant key={variant.size}
														 size={variant.size}
														 price={variant.price}
														 weight={variant.weight}
														 count={variant.count}
														 id={id}
				/>
			});
		};

		return (
			<div>
				<img src={photo} alt={title}/>
				<div className='pizzaInfo'>
					<h3>{title}</h3>
					{renderVariants(quantityPizzas)}
				</div>
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

const PizzaVariant = ({size, price, weight, count, id}) => {
	const content = count === 0 ? <AddToCart/> : <Counter/>;

	console.log()

	const countPizza = <Consumer>
		{
			({items}) => {
				if (items.id !== id) {

				}
			}
		}
	</Consumer>

	return (
		<div className='variant'>
			<div className='info'>
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