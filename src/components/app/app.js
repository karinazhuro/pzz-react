import React, {Component} from 'react';
import {BrowserRouter, Route} from "react-router-dom";

import PizzaService from "../../services/pizza-service";
import {Provider} from "../pizzas-service-context";
import Spinner from "../spinner";
import Header from "../header";
import Main from "../menu";
import Basket from "../basket";

export default class App extends Component {
	pizzaService = new PizzaService();

	state = {
		pizzasList: [],
		saucesList: [],
		countablePizzaList: [],
		countableSaucesList: [],
		basket: [],
	};

	componentDidMount() {
		this.init();
	};

	async init() {
		const pizzasListAsync = this.pizzaService.getPizzas();
		const basketAsync = this.pizzaService.getBasket();
		const saucesAsync = this.pizzaService.getSauces();

		const pizzasList = await pizzasListAsync;
		const saucesList = await saucesAsync;
		const basket = await basketAsync;

		this.setState({
			pizzasList,
			saucesList,
			basket,
			countablePizzaList: this.createCountablePizzas(
				pizzasList, basket),
			countableSaucesList: this.createCountableSauces(
				saucesList, basket),
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

	createCountableSauces(sauces, basket) {
		console.log(basket)
		const sauce = sauces.map(sauce => {
			return {
				...sauce,
				// count: this.getVariantCountInBasket(sauce.id, variant.size, basket.items),
			};
		});

		console.log(sauce);
	};

	onAddItem = async (type, id, size) => {
		const {pizzasList} = this.state;

		await this.pizzaService.addItem(type, id, size)
			.then(res => {
				this.setState({
					basket: res,
					countablePizzaList: this.createCountablePizzas(pizzasList, res),
				});
			});
	};

	onRemoveItem = async (type, id, size) => {
		const {pizzasList} = this.state;

		await this.pizzaService.removeItem(type, id, size)
			.then(res => {
				this.setState({
					basket: res,
					countablePizzaList: this.createCountablePizzas(pizzasList, res),
				});
			});
	};

	render() {
		const {pizzasList, saucesList, basket, countablePizzaList} = this.state;

		// console.log(pizzasList, basket, countablePizzaList);

		if (pizzasList.length === 0) {
			return <Spinner/>;
		}

		return (
			<Provider value={{
				basket,
				saucesList,
				countablePizzaList,
				onAddItem: this.onAddItem,
				onRemoveItem: this.onRemoveItem,
			}}>
				<BrowserRouter>
					<div>
						<Header/>
						<Route path='/' component={Main} exact/>
						<Route path='/basket' component={Basket}/>
					</div>
				</BrowserRouter>
			</Provider>
		);
	};
};