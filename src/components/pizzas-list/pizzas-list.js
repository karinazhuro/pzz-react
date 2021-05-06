import React, {Component} from 'react';

import PizzaListItem from "../pizza-list-item";
import Spinner from "../spinner";
import {Consumer} from "../pizzas-service-context";

import './pizzas-list.css';

class PizzasList extends Component {
	componentDidMount() {
		// <Consumer>
		// 	{
		// 		(service) => {
		// 			return (
		// 				service.getPizzas()
		// 					.then((pizzasList) => {
		// 						this.setState({
		// 							pizzasList,
		// 						});
		// 					});
		// 			)
		//
		// 		}
		// 	}
		// </Consumer>
		// this.pizzaService
		// 	.getPizzas()
		// 	.then((pizzasList) => {
		// 		this.setState({
		// 			pizzasList,
		// 		});
		// 	});
	}

	renderItem = (arr) => {
		return arr.map(({id, photo, title, variants}) => {
			return (
				<li key={id}>
					<PizzaListItem
						id={id}
						photo={photo}
						title={title}
						variants={variants}/>
				</li>
			);
		});
	};

	render() {
		return (
			<main>
				<ul>
					<Consumer>
						{
							({pizzasList}) => {
								return !pizzasList ? <Spinner/> : this.renderItem(pizzasList)
							}
						}
					</Consumer>
				</ul>
			</main>
		);
	};
}

export default PizzasList;