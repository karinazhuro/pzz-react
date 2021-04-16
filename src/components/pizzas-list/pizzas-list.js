import React, {Component} from 'react';

import PizzaService from "../../services/pizza-service";
import PizzaItem from "../pizza-item";

export default class PizzasList extends Component {
	pizzaService = new PizzaService();

	state = {
		pizzasList: null,
	}

	componentDidMount() {
		this.pizzaService
			.getPizzas()
			.then((pizzasList) => {
				this.setState({
					pizzasList,
				});
			});
	}

	renderItems(arr) {
		return arr.map(({id, title}) => {
			return (
				<li key={id}>
					{title}
				</li>
			)
		})
	}

	render() {
		const {pizzasList} = this.state;


		if (!pizzasList) {
			// TODO: add spinner
			return <span>hi</span>
		}

		const items = this.renderItems(pizzasList);
		return (
			<ul>
				{/*{items}*/}
			</ul>
		);
	};
};