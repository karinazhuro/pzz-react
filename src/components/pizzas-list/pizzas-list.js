import React, {Component} from 'react';

import PizzaListItem from "../pizza-list-item";
import {Consumer} from '../pizzas-service-context';

import './pizzas-list.scss';

export default class PizzasList extends Component {
	renderItem = (productList) => {
		return productList.map(product => {
			const {id} = product;

			return (
				<li className='menuPizza' key={id}>
					<PizzaListItem product={product}/>
				</li>
			)
		});
	};

	render() {
		return (
			<div className='pizzas'>
				<ul className='pizzasList'>
					{
						<Consumer>
							{
								({countablePizzasList}) => this.renderItem(countablePizzasList)
							}
						</Consumer>
					}
				</ul>
			</div>
		);
	};
};