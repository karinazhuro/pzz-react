import React, {Component} from 'react';

import translationSizes from "../../utils/translation-sizes";
import {Consumer} from "../pizzas-service-context";
import ContentCounter from "../content-counter";

import './pizza-list-item.scss';

export default class PizzaListItem extends Component {
	renderVariants(product) {
		const {id, variants} = product;

		return variants.map(variant => {
			const {size, price, weight, count} = variant;

			return <PizzaVariant key={size}
													 id={id}
													 size={size}
													 price={price}
													 weight={weight}
													 count={count}
													 product={product}
			/>
		});
	};

	render() {
		const product = this.props.product
		const {photo, title, description} = product;

		return (
			<React.Fragment>
				<img src={photo} alt={title}/>
				<div className='pizzaInfo'>
					<h3 className='title'>{title}</h3>
					{this.renderVariants(product)}
				</div>
				<p className='desc'>{description}</p>
			</React.Fragment>
		);
	};
};

const PizzaVariant = ({size, price, weight, count, id, product}) => {
	const {type, title} = product;
	const productData = {
		id,
		size,
		title,
		price,
		// count,
		// type,
	};

	return (
		<Consumer>
			{
				({onAddItem, onRemoveItem}) => {
					return (
						<div className='variant'>
							<div className='infoAboutVariant'>
								<p className='size'>{translationSizes[size]}</p>
								<p className='price'>{(price / 10000).toFixed(2)}</p>
								<p className='weight'>{weight}</p>
							</div>
							<div className='countPizzas'>
								{
									<ContentCounter count={count}
																	onAddItem={onAddItem}
																	onRemoveItem={onRemoveItem}
																	productData={productData}/>
								}
							</div>
						</div>
					)
				}
			}
		</Consumer>
	);
};