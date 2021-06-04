import React, {Component} from 'react';

import PizzaListItem from "../pizza-list-item";
import {Consumer} from '../pizzas-service-context';

import './pizzas-list.scss';

class PizzasList extends Component {
	renderItem = (pizzaList) => {
		return pizzaList.map(({id, photo, title, variants, description}) => {
			return (
				<li key={id}>
					<PizzaListItem
						id={id}
						photo={photo}
						title={title}
						variants={variants}
						description={description}/>
				</li>
			);
		});
	};

	render() {
		return (
			<main className='menu'>
				<ul>{
					<Consumer>
						{
							({countablePizzaList}) => this.renderItem(countablePizzaList)
						}
					</Consumer>
				}</ul>
			</main>
		);
	};
}

export default PizzasList;