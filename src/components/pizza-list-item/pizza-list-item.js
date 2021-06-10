import React, {Component} from 'react';

import enumTranslation from "../../utils/enumTranslations";
import {Consumer} from "../pizzas-service-context";
import AddToBasket from "../addToBasket";
import Counter from "../counter";

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
	const content = (onAddItem, onRemoveItem) => {
		const type = 'pizza';

		return (
			count === 0 ?
				<AddToBasket onAddItem={() => onAddItem(id, size, type)}/> :
				<Counter count={count}
								 onPlusClick={() => onAddItem(id, size, type)}
								 onMinusClick={() => onRemoveItem(id, size, type)}/>
		)
	};

	return (
		<Consumer>
			{
				({onAddItem, onRemoveItem}) => {
					return (
						<div className='variant'>
							<div className='infoAboutVariant'>
								<p className='size'>{enumTranslation[size]}</p>
								<p className='price'>{price}</p>
								<p className='weight'>{weight}</p>
							</div>
							<div className='countPizzas'>
								{content(onAddItem, onRemoveItem)}
							</div>
						</div>
					)
				}
			}
		</Consumer>
	);
};