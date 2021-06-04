import React, {Component} from 'react';
import {BrowserRouter, Route} from "react-router-dom";

import PizzaService from "../../services/pizza-service";
import {Provider} from "../pizzas-service-context";
import Header from "../header";
import PizzasList from "../pizzas-list";
import Spinner from "../spinner";
import Basket from "../basket";

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

	addItemToCart = async (e, id, size) => {
		const {pizzasList} = this.state;
		const formData = new FormData();
		let addItem;

		formData.append('type', 'pizza');
		formData.append('id', id);
		formData.append('size', size);
		formData.append('dough', 'thin');

		if (e.target.className === 'minus') {
			addItem = await this.pizzaService.removeItem(formData);
		} else {
			addItem = await this.pizzaService.addItem(formData);
		}

		this.setState({
			basket: addItem,
			countablePizzaList: this.createCountablePizzas(pizzasList, addItem)
		});
	};

	render() {
		const {pizzasList, basket, countablePizzaList} = this.state;

		// console.log(countablePizzaList);

		if (pizzasList.length === 0) {
			return <Spinner/>;
		}

		return (
			<Provider value={{
				basket,
				countablePizzaList,
				addItemToCart: this.addItemToCart,
			}}>
				<BrowserRouter>
					<div>
						<Header/>
						<Route path='/' component={PizzasList} exact/>
						<Route path='/basket' component={Basket} />
					</div>
				</BrowserRouter>
			</Provider>
		);
	};
};