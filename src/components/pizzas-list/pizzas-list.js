import React, {Component} from 'react';

import PizzaListItem from "../pizza-list-item";
import {Consumer} from '../pizzas-service-context';

import './pizzas-list.scss';
import EnumTypes from "../../utils/enum-types";

class PizzasList extends Component {
	renderItem = (productList) => {
		return productList.map(product => {
			const {type, id} = product;

			if (type === EnumTypes.pizza) {
				return (
					<li className='pizza' key={id}>
						<PizzaListItem product={product}/>
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
							({countablePizzaList}) => this.renderItem(countablePizzaList)
						}
					</Consumer>}
				</ul>
			</div>
		);
	};
}

export default PizzasList;