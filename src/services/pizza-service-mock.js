import pizzas from '../assets/pizzas.json';
import sauces from '../assets/sauces.json';
import basket from '../assets/basket.json';
import streets from '../assets/streets.json';
import region from '../assets/regions.json';
import house from '../assets/house.json';

import transformPizza from "../utils/transforms/transform-pizza";
import transformSauces from "../utils/transforms/transform-sauces";
import transformBasket from "../utils/transforms/transform-basket";
import transformRegion from "../utils/transforms/transform-region";
import transformHouse from "../utils/transforms/transform-house";

import EnumTypes from "../utils/enums/enum-types";

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

		streets.data.forEach(street => {
			const findStreet =
				street.title.toLowerCase().startsWith(subStreet.toLowerCase());

			if (findStreet) {
				streetsList.push(street)
			}
		});

		return Promise.resolve(streetsList);
	};

	// get houses
	getNumberHouses = async (houseId) => {
		return Promise.resolve(region.data.map(transformRegion));
	};

	getHouse = async (houseId) => {
		return Promise.resolve(transformHouse(house));
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

	submit = async (formData) => {
		const {
			name, phone,
			street, house, flat, entrance, floor, intercom,
			comment,
			streetId, houseId,
		} = formData;

		basket.data.address = {
			name,
			phone,
			street,
			house,
			flat,
			entrance,
			floor,
			intercom,
			street_id: streetId,
			house_id: houseId,
		};

		basket.data.comment = comment;

		console.log('mock', formData);

		// return {
		// 	[cart.data.price]: 0,
		// 	[cart.data.items]: cart.data.items.pop(),
		// 	[cart.data.quantityPizzas]: 0,
		// }

		// console.log('mock', cart.data);
	};
}