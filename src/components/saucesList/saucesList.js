import React, {Component} from 'react';

import {Consumer} from "../pizzas-service-context";

import './saucesList.scss';

export default class SaucesList extends Component {
	renderSaucesList = (saucesList) => {
		return saucesList.map(sauce => {
			const {id, photo, title} = sauce;

			return (
				<li key={id}>
					<img src={photo} alt={title}/>
				</li>
			)
		})
	}

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
						)
					}
				}
			</Consumer>
		);
	}
};