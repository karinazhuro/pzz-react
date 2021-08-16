import React, {Component} from 'react';
import {BrowserRouter, Route} from "react-router-dom";

import PizzaServiceMock from "../../services/pizza-service-mock";
import {Provider} from "../pizzas-service-context";
import Spinner from "../spinner";
import Header from "../header";
import Basket from "../basket";
import Menu from "../menu";
import EnumTypes from "../../utils/enum-types";

export default class App extends Component {
	pizzaServiceMock = new PizzaServiceMock();

	state = {
		pizzasList: [],
		saucesList: [],
		// str: [],
		basket: [],
		countablePizzasList: [],
		countableSaucesList: [],
		basketPizzaList: [],
	};

	componentDidMount() {
		this.init();
	};

	async init() {
		const pizzasListAsync = this.pizzaServiceMock.getPizzas();
		const saucesListAsync = this.pizzaServiceMock.getSauces();
		const basketAsync = this.pizzaServiceMock.getBasket();
		// const str = this.pizzaServiceMock.getStreets();

		const pizzasList = await pizzasListAsync;
		const saucesList = await saucesListAsync;
		const basket = await basketAsync;

		this.setState({
			pizzasList,
			saucesList,
			// str,
			basket,
			countablePizzasList: this.createCountablePizzasList(pizzasList, basket),
			countableSaucesList: this.createCountableSaucesList(saucesList, basket),
			basketPizzaList: this.combineBasket(basket),
		});
	};

	getVariantCountInBasket(product, basketItems) {
		let quantity = 0;

		for (let item of basketItems) {
			if (this.isEqualProducts(product, item)) {
				quantity += 1;
			}
		}

		return quantity;
	};

	createCountablePizzasList(pizzas, basket) {
		return pizzas.map(pizza => {
			return {
				...pizza,
				variants: pizza.variants.map(variant => ({
					...variant,
					quantity: this.getVariantCountInBasket({id: pizza.id, size: variant.size, type: EnumTypes.pizza},
						basket.items),
				})),
			};
		});
	};

	createCountableSaucesList(sauces, basket) {
		return sauces.map(sauce => {
			return {
				...sauce,
				quantity: this.getVariantCountInBasket({id: sauce.id, size: sauce.size, type: EnumTypes.sauce},
					basket.items),
			}
		});
	};

	onBasketChanged(basket) {
		const {pizzasList, saucesList} = this.state;

		this.setState({
			basket,
			countablePizzasList: this.createCountablePizzasList(pizzasList, basket),
			countableSaucesList: this.createCountableSaucesList(saucesList, basket),
			basketPizzaList: this.combineBasket(basket),
		});
	}

	async onAddItem(item) {
		const basket = await this.pizzaServiceMock.addItem(item);

		this.onBasketChanged(basket);
	};

	async onRemoveItem(item) {
		const basket = await this.pizzaServiceMock.removeItem(item);

		this.onBasketChanged(basket);
	};

	isEqualProducts = (product1, product2) => {
		return product1.type === product2.type &&
			product1.id === product2.id &&
			product1.size === product2.size
	};

	combineBasket = (basket) => {
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
			// str,
			basket,
			countablePizzasList,
			countableSaucesList,
			basketPizzaList,
		} = this.state;

		// console.log(str);

		if (!pizzasList.length) {
			return <Spinner/>;
		}

		return (
			<Provider value={{
				basket,
				countablePizzasList,
				countableSaucesList,
				basketPizzaList,
				onAddItem: (item) => this.onAddItem(item),
				onRemoveItem: (item) => this.onRemoveItem(item),
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