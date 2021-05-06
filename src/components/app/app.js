import React, {Component} from 'react';

import PizzaService from "../../services/pizza-service";
import Header from "../header";
import PizzasList from "../pizzas-list";
import {Provider} from "../pizzas-service-context";

export default class App extends Component {
	pizzaService = new PizzaService();

	state = {
		pizzasList: [],
		cart: {
			price: 0,
      items: {},
		}
	};

	componentDidMount() {
		this.pizzaService
			.getBasket()
			.then((cart) => {
				this.setState({
					cart,
				});
			});
	};

	render() {
		return (
			<Provider value={{state: this.state, service: this.pizzaService}}>
				<div>
					<Header/>
					<PizzasList/>
				</div>
			</Provider>
		);
	};
};