import React, {Component} from 'react';

import {Consumer} from "../pizzas-service-context";
import EnumSizes from "../../utils/enum-sizes";
import ContentCounter from "../content-counter";

import './saucesList.scss';

export default class SaucesList extends Component {
	renderSaucesList = (saucesList, onAddItem, onRemoveItem) => {
		return saucesList.map(sauce => {
			const {id, photo, title, price} = sauce;

			return (
				<li className='sauce' key={id}>
					<img src={photo} alt={title}/>
					<h3 className='sauceTitle'>{title}</h3>
					<p className='saucePrice'>{price}</p>
					<ContentCounter count={0}
													onAddItem={onAddItem}
													onRemoveItem={onRemoveItem}
													id={id}
													size={EnumSizes.big}/>
				</li>
			);
		});
	};

	render() {
		return (
			<Consumer>
				{
					({saucesList, onAddItem, onRemoveItem}) => {
						return (
							<div className='sauces'>
								<h2 className='titleBlock'>Соусы</h2>
								<ul className='saucesList'>
									{this.renderSaucesList(saucesList, onAddItem, onRemoveItem)}
								</ul>
							</div>
						);
					}
				}
			</Consumer>
		);
	};
};