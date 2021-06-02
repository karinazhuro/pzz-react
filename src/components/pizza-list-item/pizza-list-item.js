import React, {Component} from 'react';

import enumTranslations from '../../utils/enumTranslations';
import {Consumer} from "../pizzas-service-context";

import './pizza-list-item.scss';

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
			<div className='pizza'>
				<img src={photo} alt={title}/>
				<div className='pizzaInfo'>
					<h3 className='title'>{title}</h3>
					{this.renderVariants(id, variants)}
				</div>
				<p className='desc'>{description}</p>
			</div>
		);
	};
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
										onClick={(e) => addItemToCart(e, id, size)}>
							В корзину</button>
					)
				}
			}
		</Consumer>
	);
};

const Counter = ({count, id, size}) =>  {
	return (
		<Consumer>
			{
				({addItemToCart}) => {
					return (
						<div className='counter'>
							<button className='minus'
											onClick={(e) => addItemToCart(e, id, size)}>-
							</button>
							<p className='count'>{count}</p>
							<button className='plus'
											onClick={(e) => addItemToCart(e, id, size)}>+
							</button>
						</div>
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
			<div className='infoAboutVariant'>
				<p className='size'>{enumTranslations(size)}</p>
				<p className='price'>{price}</p>
				<p className='weight'>{weight}</p>
			</div>
			<div className='countPizzas'>
				{content}
			</div>
		</div>
	);
};