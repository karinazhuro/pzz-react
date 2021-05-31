import React, {Component} from 'react';

import enumTranslations from '../../utils/enumTranslations';
import {Consumer} from "../pizzas-service-context";

import './pizza-list-item.css';

export default class PizzaListItem extends Component {
	renderVariants(id, variants) {
		return variants.map(variant => {
			return <PizzaVariant key={variant.size}
													 id={id}
													 size={variant.size}
													 price={variant.price}
													 weight={variant.weight}
													 count={variant.count}
			/>
		});
	};

	render() {
		const {id, photo, title, variants, description} = this.props;

		return (
			<div>
				<img src={photo} alt={title}/>
				<div className='pizzaInfo'>
					<h3>{title}</h3>
					{this.renderVariants(id, variants)}
				</div>
				<p className='desc'>{description}</p>
			</div>
		);
	};
};

const Counter = ({count, id, size}) =>  {
	return (
		<Consumer>
			{
				({addItemToCart}) => {
					return (
						<div className='counter'>
							<button className='minus'
											onClick={() => addItemToCart(id, size)}>-
							</button>
							<p>{count}</p>
							<button className='plus'
											onClick={() => addItemToCart(id, size)}>+
							</button>
						</div>
					)
				}
			}
		</Consumer>
	);
};

const AddToCart = ({id, size}) => {
	return (
		<Consumer>
			{
				({addItemToCart}) => {
					return (
						<button className='addToCart'
										id={id}
										sizevariant={size}
										onClick={() => addItemToCart(id, size)}>
							В корзину</button>
					)
				}
			}
		</Consumer>
	);
};

const PizzaVariant = ({id, size, price, weight, count}) => {
	const content = count === 0 ?
		<AddToCart id={id} size={size}/> : <Counter count={count} id={id} size={size}/>;

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