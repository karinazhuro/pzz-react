import React, {Component} from 'react';

import {Consumer} from "../pizzas-service-context";

import './saucesList.scss';
import AddToBasket from "../addToBasket";

export default class SaucesList extends Component {
	renderSaucesList = (saucesList, onAddItem) => {
		return saucesList.map(sauce => {
			const {id, photo, title, price} = sauce;

			return (
				<li className='sauce' key={id}>
					<img className='sauceImg' src={photo} alt={title}/>
					<h3 className='sauceTitle'>{title}</h3>
					<p className='saucePrice'>{price}</p>
					<AddToBasket id={id}
											 size='big'
											 onAddItem={() => onAddItem(id)}/>
				</li>
			)
		})
	}

	render() {
		return (
			<Consumer>
				{
					({saucesList, onAddItem}) => {
						return (
							<div className='sauces'>
								<h2 className='titleBlock'>Соусы</h2>
								<ul className='saucesList'>
									{this.renderSaucesList(saucesList, onAddItem)}
								</ul>
							</div>
						)
					}
				}
			</Consumer>
		);
	}
};