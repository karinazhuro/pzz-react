import React, {Component} from 'react';

import {Consumer} from "../pizzas-service-context";
import SaucesListItems from "../sauces-list-items";

import './sauces-list.scss';

export default class SaucesList extends Component {
	renderItems = (productList) => {
		return productList.map(product => {
			const {id} = product;

			return (
				<li className='sauce' key={id}>
					<SaucesListItems product={product}/>
				</li>
			)
		});
	};

	render() {
		return (
			<Consumer>
				{
					({countableSaucesList}) => {
						return (
							<div className='sauces'>
								<h2 className='titleBlock'>Соусы</h2>
								<ul className='saucesList'>
									{this.renderItems(countableSaucesList)}
								</ul>
							</div>
						);
					}
				}
			</Consumer>
		);
	};
};