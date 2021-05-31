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

		// console.log(basket)

		this.setState({
			pizzasList,
			basket,
			countablePizzaList: this.createCountablePizzas(
				pizzasList, basket),
		});
	};

	getVariantCountInBasket(id, size, basketItems) {
		let count = 0;

		for (let items of basketItems) {
			if (items.id === id && items.size === size) {
				count += 1;
			}
		}

		return count;
	};

	createCountablePizzas(pizzas, basket) {

		// console.log(basket.price)

		return pizzas.map(pizza => {
			return {
				...pizza,
				variants: pizza.variants.map(variant => ({
					...variant,
					count: this.getVariantCountInBasket(pizza.id, variant.size, basket.items),
				})),
			};
		});
	};

	formDataForChangeBasket(id, size) {
		const formData = new FormData();

		formData.append('type', 'pizza');
		formData.append('id', id);
		formData.append('size', size);
		formData.append('dough', 'thin');

		return formData;
	};

	addItemToCart = async (id, size) => {
		const {pizzasList} = this.state;

		const addItem = await this.pizzaService.addItem(this.formDataForChangeBasket)

		// console.log(addItem, basket)

		this.setState({
			basket: addItem,
			countablePizzaList: this.createCountablePizzas(pizzasList, addItem)
		});
	};

	render() {
		const {pizzasList, basket, countablePizzaList} = this.state;

		// console.log(pizzasList, basket, countablePizzaList)

		if (pizzasList.length === 0) {
			return <Spinner/>;
		}

		return (
			<Provider value={{
				basket: basket.price,
				countablePizzaList,
				addItemToCart: this.addItemToCart,
			}}>
				<div>
					<Header/>
					<PizzasList/>
				</div>
			</Provider>
		);
	};
};