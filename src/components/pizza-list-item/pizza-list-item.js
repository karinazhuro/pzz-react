import React, {Component} from 'react';

import translationSizes from "../../utils/translation-sizes";
import {Consumer} from "../pizzas-service-context";
import ContentCounter from "../content-counter";

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
			<React.Fragment>
				<img src={photo} alt={title}/>
				<div className='pizzaInfo'>
					<h3 className='title'>{title}</h3>
					{this.renderVariants(id, variants)}
				</div>
				<p className='desc'>{description}</p>
			</React.Fragment>
		);
	};
};

const PizzaVariant = ({id, size, price, weight, count}) => {
	return (
		<Consumer>
			{
				({onAddItem, onRemoveItem}) => {
					return (
						<div className='variant'>
							<div className='infoAboutVariant'>
								<p className='size'>{translationSizes[size]}</p>
								<p className='price'>{price}</p>
								<p className='weight'>{weight}</p>
							</div>
							<div className='countPizzas'>
								{<ContentCounter count={count}
																 onAddItem={onAddItem}
																 onRemoveItem={onRemoveItem}
																 id={id}
																 size={size}/>}
							</div>
						</div>
					)
				}
			}
		</Consumer>
	);
};