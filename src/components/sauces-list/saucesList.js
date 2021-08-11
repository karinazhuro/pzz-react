import React, {Component} from 'react';

import {Consumer} from "../pizzas-service-context";
import SaucesListItems from "../sauces-list-items";

import './saucesList.scss';

export default class SaucesList extends Component {
	renderSaucesList = (saucesList) => {
		return saucesList.map(product => {
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
					({saucesList}) => {
						return (
							<div className='sauces'>
								<h2 className='titleBlock'>Соусы</h2>
								<ul className='saucesList'>
									{this.renderSaucesList(saucesList)}
								</ul>
							</div>
						);
					}
				}
			</Consumer>
		);
	};
};