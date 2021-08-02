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

	componentDidUpdate(prevProps, prevState, snapshot) {
		const {basket, basketPizzaList} = this.state;

		if (prevProps.basketPizzaList !== basketPizzaList) {
			this.setState({
				basketPizzaList: this.combinePizzas(basket),
			})
		}
	}

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

	onAddItem = async (item) => {
		const {pizzasList} = this.state;
		const basket = this.pizzaServiceMock.addItem(item);


		this.setState({
			basket,
			countablePizzaList: this.createCountablePizzas(pizzasList, basket),
		});
	};

	onRemoveItem = async (item) => {
		const {pizzasList} = this.state;
		const basket = this.pizzaServiceMock.removeItem(item);

		this.setState({
			basket,
			countablePizzaList: this.createCountablePizzas(pizzasList, basket),
		});
	};

	isEqualProducts = (product1, product2) => {
		return product1.id === product2.id &&
			product1.size === product2.size
	};

	combinePizzas = (basket) => {
		const items = basket.items;
		const {basketPizzaList} = this.state;

		for (let i = 0; i < items.length; i++) {
			let isExist = false;

			for (let j = 0; j < basketPizzaList.length; j++) {
				if (this.isEqualProducts(items[i], basketPizzaList[j])) {
					this.setState({
						basketPizzaList: basketPizzaList[j].count += 1,
					});

					isExist = true;
					break;
				}
			}

			if (!isExist) {
				this.setState({
					basketPizzaList: basketPizzaList.push({
						...items[i],
						count: 1,
					}),
				});
			}
		}

		return basketPizzaList;
	};

	render() {
		const {
			pizzasList,
			saucesList,
			basket,
			countablePizzaList,
			basketPizzaList,
		} = this.state;

		console.log(basketPizzaList)

		if (pizzasList.length === 0) {
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
					<div>
						<Header/>
						<Route path='/' component={Menu} exact/>
						<Route path='/basket' component={Basket}/>
					</div>
				</BrowserRouter>
			</Provider>
		);
	};
};