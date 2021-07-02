import React, {Component} from 'react';
import {BrowserRouter, Route} from "react-router-dom";

// import PizzaService from "../../services/pizza-service";
import PizzaServiceMock from "../../services/pizza-service-mock";
import {Provider} from "../pizzas-service-context";
import Spinner from "../spinner";
import Header from "../header";
import Menu from "../menu";
import Basket from "../basket";

export default class App extends Component {
	// pizzaService = new PizzaService();
	pizzaServiceMock = new PizzaServiceMock();

	state = {
		pizzasList: [],
		saucesList: [],
		basket: [],
		countablePizzaList: [],
	};

	componentDidMount() {
		this.init();
	};

	async init() {
		// const pizzasListAsync = this.pizzaService.getPizzas();
		// const saucesAsync = this.pizzaService.getSauces();
		// const basketAsync = this.pizzaService.getBasket();
		// const pizzasList = await pizzasListAsync;
		// const saucesList = await saucesAsync;
		// const basket = await basketAsync;

		const pizzasList = this.pizzaServiceMock.getPizzas();
		const saucesList = this.pizzaServiceMock.getSauces();
		const basket = this.pizzaServiceMock.getBasket();

		this.setState({
			pizzasList,
			saucesList,
			basket,
			countablePizzaList: this.createCountablePizzas(
				pizzasList, basket),
			// countableProductList: this.createCountableProduct(
			// 	pizzasList, saucesList, basket),
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
		// console.log(basket)

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

	// createCountableProduct(pizzas, sauces, basket) {
	// 	const pizza = pizzas.map(pizza => {
	// 		return {
	// 			type: EnumTypes.pizza,
	// 			...pizza,
	// 			variants: pizza.variants.map(variant => ({
	// 				...variant,
	// 				count: this.getVariantCountInBasket(pizza.id, variant.size, basket.items),
	// 			})),
	// 		};
	// 	});
	//
	// 	const sauce = sauces.map(sauce => {
	// 		return {
	// 			type: EnumTypes.sauce,
	// 			...sauce,
	// 			count: 0,
	// 		}
	// 	});
	//
	// 	return pizza.concat(sauce);
	// };

	onAddItem = async (item) => {
		const {pizzasList} = this.state;
		const basket = this.pizzaServiceMock.addItem(item)

		this.setState({
			basket,
			countablePizzaList: this.createCountablePizzas(pizzasList, basket),
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

		console.log(countablePizzaList);

		if (pizzasList.length === 0) {
			return <Spinner/>;
		}

		return (
			<Provider value={{
				saucesList,
				basket,
				countablePizzaList,
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