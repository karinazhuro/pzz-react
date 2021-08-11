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
				<h2 className='titleBlock'>Пиццы</h2>
				<ul className='pizzasList'>
					{
						<Consumer>
							{
								({countablePizzaList}) => this.renderItem(countablePizzaList)
							}
						</Consumer>
					}
				</ul>
			</div>
		);
	};
};