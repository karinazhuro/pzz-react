import React, {Component} from 'react';

import PizzaService from "../../services/pizza-service";
import {Provider} from "../pizzas-service-context";
import Header from "../header";
import PizzasList from "../pizzas-list";
import Spinner from "../spinner";

export default class App extends Component {
	pizzaService = new PizzaService();

	state = {
		pizzasList: [],
		countablePizzaList: [],
		basket: [],
	};

	componentDidMount() {
		this.init();
	};

	async init() {
		const pizzasListAsync = this.pizzaService.getPizzas();
		const basketAsync = this.pizzaService.getBasket();
		const pizzasList = await pizzasListAsync;
		const basket = await basketAsync;

		this.setState({
			pizzasList,
			basket,
			countablePizzaList: this.createCountablePizzas(
				pizzasList, basket),
		});
	};

	getPizzaCountInBasket(pizza, basketItems) {
		let count = 0;

		for (let items in basketItems) {
			if (basketItems[items].id === pizza.id) {

				for (let variant of pizza.variants) {
					if (basketItems[items].size === variant.size) {
						return count += 1;
					}
				}
			}
		}

		return count;
	};

	createCountablePizzas(pizzas, basket) {
		return pizzas.map(pizza => {
			return {
				id: pizza.id,
				photo: pizza.photo,
				title: pizza.title,
				description: pizza.description,
				variants: pizza.variants.map(variant => ({
					size: variant.size,
					price: variant.price,
					weight: variant.weight,
					count: this.getPizzaCountInBasket(pizza, basket.items),
				})),
			};
		});
	};

	render() {
		const {pizzasList, basket, countablePizzaList} = this.state;

		console.log(countablePizzaList);
		if (pizzasList.length === 0) {
			return <Spinner/>;
		}

		return (
			<Provider value={{basket: basket.price, countablePizzaList}}>
				<div>
					<Header/>
					<PizzasList/>
				</div>
			</Provider>
		);
	};
};