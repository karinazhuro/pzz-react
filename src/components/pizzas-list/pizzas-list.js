import React, {Component} from 'react';

import {Consumer} from '../pizzas-service-context';
import PizzaListItem from "../pizza-list-item";

import './pizzas-list.scss';

export default class PizzasList extends Component {
	renderItem = (productList) => {
		return productList.map(product => {
			const {id} = product;

			return (
				<li className='pizza' key={id}>
					<PizzaListItem product={product}/>
				</li>
			)
		});
	};

	render() {
		return (
			<div className='pizzasMenu'>
				<h2 className='titleBlock'>Пиццы</h2>
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