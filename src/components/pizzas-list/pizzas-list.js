import React, {Component} from 'react';

import PizzaService from "../../services/pizza-service";
import PizzaListItem from "../pizza-list-item";
import Spinner from "../spinner";

import './pizzas-list.css';

class PizzasList extends Component {
	pizzaService = new PizzaService();

	state = {
		pizzasList: null,
	};

	componentDidMount() {
		this.pizzaService
			.getPizzas()
			.then((pizzasList) => {
				this.setState({
					pizzasList,
				});
			});
	};

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
		const {pizzasList} = this.state;

		if (!pizzasList) {
			return <Spinner/>
		}

		return (
			<main>
				<ul>
					{this.renderItem(pizzasList)}
				</ul>
			</main>
		);
	};
}

export default PizzasList;