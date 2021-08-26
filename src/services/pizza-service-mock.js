import pizzas from '../assets/pizzas.json';
import sauces from '../assets/sauces.json';
import basket from '../assets/basket.json';
import streets from '../assets/streets.json';
import regions from '../assets/regions.json';

import transformPizza from "../utils/transform-pizza";
import transformSauces from "../utils/transform-sauces";
import transformBasket from "../utils/transform-basket";
import transformRegion from "../utils/transform-region";

import EnumTypes from "../utils/enum-types";

export default class PizzaServiceMock {
	getPizzas = async () => {
		return Promise.resolve(pizzas.data.map(transformPizza));
	};

	getSauces = async () => {
		return Promise.resolve(sauces.data.map(transformSauces))
	};

	getBasket = async () => {
		return Promise.resolve(transformBasket(basket.data))
	};

	getStreets = async (subStreet) => {
		const streetsList = [];

		streets.data.map(street => {
			const findStreet = street.title.toLowerCase().startsWith(subStreet.toLowerCase());

			if (findStreet) {
				streetsList.push(street)
			}
		});

		return Promise.resolve(streetsList);
	};

	// get houses
	getNumberHouses = async (id) => {
		return Promise.resolve(regions.data.map(transformRegion));
	};

	getHouse = async () => {

	};

	addItem = async (product) => {
		let {price} = product;
		let {items} = basket.data;

		if (product.type === EnumTypes.pizza) {
			basket.data.quantityPizzas += 1;
		}

		basket.data.price += price;
		items.push(product);

		return (transformBasket(basket.data));
	};

	removeItem = async (product) => {
		const {price} = product;
		let findIndexProduct = basket.data.items.findIndex(item => {
			return item.id === product.id && item.size === product.size;
		});

		if (product.type === EnumTypes.pizza) {
			basket.data.quantityPizzas -= 1;
		}

		basket.data.price -= price;
		basket.data.items.splice(findIndexProduct, 1);

		return Promise.resolve(transformBasket(basket.data));
	};
}