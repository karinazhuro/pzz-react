import React, {Component} from 'react';
import {BrowserRouter, Route} from "react-router-dom";

import PizzaServiceMock from "../../services/pizza-service-mock";
import {Provider} from "../pizzas-service-context";
import Spinner from "../spinner";
import Header from "../header";
import Menu from "../menu";
import Basket from "../basket";

export default class App extends Component {
	pizzaServiceMock = new PizzaServiceMock();

	state = {
		pizzasList: [],
		saucesList: [],
		basket: [],
		countablePizzaList: [],
		basketPizzaList: [],
	};

	componentDidMount() {
		this.init();
	};

	async init() {
		const pizzasList = this.pizzaServiceMock.getPizzas();
		const saucesList = this.pizzaServiceMock.getSauces();
		const basket = this.pizzaServiceMock.getBasket();

		this.setState({
			pizzasList,
			saucesList,
			basket,
			countablePizzaList: this.createCountablePizzas(
				pizzasList, basket),
			basketPizzaList: this.combinePizzas(basket),
		});
	};

	getVariantCountInBasket(id, size, basketItems) {
		let quantity = 0;

		for (let items of basketItems) {
			if (items.id === id && items.size === size) {
				quantity += 1;
			}
		}

		return quantity;
	};

	createCountablePizzas(pizzas, basket) {
		return pizzas.map(pizza => {
			return {
				...pizza,
				variants: pizza.variants.map(variant => ({
					...variant,
					quantity: this.getVariantCountInBasket(pizza.id, variant.size, basket.items),
				})),
			};
		});
	};

	onAddItem = async (item) => {
		const {pizzasList} = this.state;
		const basket = this.pizzaServiceMock.addItem(item);

		this.setState({
			basket,
			countablePizzaList: this.createCountablePizzas(pizzasList, basket),
			basketPizzaList: this.combinePizzas(basket),
		});
	};

	onRemoveItem = async (item) => {
		const {pizzasList} = this.state;
		const basket = this.pizzaServiceMock.removeItem(item);

		this.setState({
			basket,
			countablePizzaList: this.createCountablePizzas(pizzasList, basket),
			basketPizzaList: this.combinePizzas(basket),
		});
	};

	isEqualProducts = (product1, product2) => {
		return product1.id === product2.id &&
			product1.size === product2.size
	};

	priceCombinePizzas = (combinePizzas) => {
		console.log(combinePizzas);

		for (let j = 0; j < combinePizzas.length; j++) {
			combinePizzas[j].price *= combinePizzas[j].quantity;
		}
	};

	combinePizzas = (basket) => {
		const items = basket.items;
		const combinePizzas = [];

		for (let i = 0; i < items.length; i++) {
			let isExist = false;

			for (let j = 0; j < combinePizzas.length; j++) {
				if (this.isEqualProducts(items[i], combinePizzas[j])) {
					combinePizzas[j].quantity += 1;
					isExist = true;
					break;
				}
			}

			if (!isExist) {
				combinePizzas.push({
					...items[i],
					quantity: 1,
				});
			}
		}

		return combinePizzas;
	};

	render() {
		const {
			pizzasList,
			saucesList,
			basket,
			countablePizzaList,
			basketPizzaList,
		} = this.state;

		if (!pizzasList.length) {
			return <Spinner/>;
		}

		return (
			<Provider value={{
				saucesList,
				basket,
				countablePizzaList,
				basketPizzaList,
				onAddItem: this.onAddItem,
				onRemoveItem: this.onRemoveItem,
			}}>
				<BrowserRouter>
					<Header/>
					<Route path='/' component={Menu} exact/>
					<Route path='/basket' component={Basket}/>
				</BrowserRouter>
			</Provider>
		);
	};
};