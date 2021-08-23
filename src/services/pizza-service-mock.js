import pizzas from '../assets/pizzas.json';
import sauces from '../assets/sauces.json';
import basket from '../assets/basket.json';
import streets from '../assets/streets.json';
import houses from '../assets/houses.json';

import transformPizza from "../utils/transform-pizza";
import transformSauces from "../utils/transform-sauces";
import transformBasket from "../utils/transform-basket";
import transformStreet from '../utils/transform-street';
import transformHouses from "../utils/transform-houses";

import EnumTypes from "../utils/enum-types";

export default class PizzaServiceMock {
	getPizzas = () => {
		return Promise.resolve(pizzas.data.map(transformPizza));
	};

	getSauces = () => {
		return Promise.resolve(sauces.data.map(transformSauces))
	};

	getBasket = () => {
		return Promise.resolve(transformBasket(basket.data))
	};

	getStreets = (subStreet) => {
		const streetsList = [];

		// console.log(subStreet)
		streets.data.map(street => {

			// console.log(street.title.toLowerCase())
			const findStreet = street.title.toLowerCase().startsWith(subStreet.toLowerCase());

			if (findStreet) {
				streetsList.push(street)
			}
		});

		return Promise.resolve(streetsList);
	};

	getHouses = () => {
		return Promise.resolve(houses.data.map(transformHouses))
	};

	// countFreeSauces = (items) => {
	// 	let quantitySauces = 0;
	//
	// 	for (let i = 0; i < items.length; i++) {
	// 		if (items[i].type === EnumTypes.sauce) {
	// 			quantitySauces += 1;
	// 		}
	// 	}
	//
	// 	return quantitySauces;
	// };

	addItem = async (product) => {
		let {price} = product;
		let {quantityPizzas, items} = basket.data;
		// const quantitySauces = this.countFreeSauces(items);

		if (product.type === EnumTypes.pizza) {
			basket.data.quantityPizzas += 1;
		}

		// if (quantityPizzas >= quantitySauces) {
		// 	price = 0;
		// }

		basket.data.price += price;
		items.push(product);

		return (transformBasket(basket.data));
	};

	removeItem = (product) => {
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