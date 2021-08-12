import pizzas from '../assets/pizzas.json';
import sauces from '../assets/sauces.json';
import basket from '../assets/basket.json';
import transformPizza from "../utils/transform-pizza";
import transformSauces from "../utils/transform-sauces";
import transformBasket from "../utils/transform-basket";
import EnumTypes from "../utils/enum-types";

export default class PizzaServiceMock {
	getPizzas = () => {
		return Promise.resolve(pizzas.data.map(transformPizza));
	};

	getSauces = () => {
		return Promise.resolve(sauces.data.map(transformSauces))
	};

	getBasket = () => {
		return Promise.resolve(transformBasket(basket.data));
	};

	countFreeSauces = (items) => {
		let quantitySauces = 0;
		console.log(items)
		for (let i = 0; i < items.length; i++) {
			if (items[i].type === EnumTypes.sauce) {
				quantitySauces += 1;
			}
		}

		return quantitySauces;
	};

	addItem = async (product) => {
		console.log(product)
		let {price} = product;
		// const {quantityPizzas, items} = basket;
		// const quantitySauces = this.countFreeSauces(items);

		// console.log(product);
		// if (quantityPizzas >= quantitySauces) {
		// 	price = 0;
		// }

		if (product.type === EnumTypes.pizza) {
			basket.data.quantityPizzas += 1;
		}

		basket.data.price += price;
		basket.data.items.push(product);

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