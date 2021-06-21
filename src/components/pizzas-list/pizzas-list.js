import React, {Component} from 'react';

import PizzaListItem from "../pizza-list-item";
import {Consumer} from '../pizzas-service-context';

import './pizzas-list.scss';
import EnumTypes from "../../utils/enumTypes";

class PizzasList extends Component {
	renderItem = (productList) => {
		return productList.map(({type, id, photo, title, variants, description}) => {
			if (type === EnumTypes.pizza) {
				return (
					<li className='pizza' key={id}>
						<PizzaListItem
							id={id}
							photo={photo}
							title={title}
							variants={variants}
							description={description}/>
					</li>
				);
			}
		});
	};

	render() {
		return (
			<div className='pizzas'>
				<h2 className='titleBlock'>Пиццы</h2>
				<ul className='pizzasList'>
					{<Consumer>
						{
							({countableProductList}) => this.renderItem(countableProductList)
						}
					</Consumer>}
				</ul>
			</div>
		);
	};
}

export default PizzasList;