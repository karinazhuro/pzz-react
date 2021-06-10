import React, {Component} from 'react';

import PizzaListItem from "../pizza-list-item";
import {Consumer} from '../pizzas-service-context';

import './pizzas-list.scss';

class PizzasList extends Component {
	renderItem = (pizzaList) => {
		return pizzaList.map(({id, photo, title, variants, description}) => {
			return (
				<li className='pizza' key={id}>
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