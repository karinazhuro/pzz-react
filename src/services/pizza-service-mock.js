import pizzas from '../assets/pizzas.json';
import sauces from '../assets/sauces.json';
import basket from '../assets/basket.json';
import transformPizza from "../utils/transform-pizza";
import transformSauces from "../utils/transform-sauces";
import transformBasket from "../utils/transform-basket";

export default class PizzaServiceMock {

	getPizzas = () => {
		return pizzas.data.map(transformPizza);
	};

	getSauces = () => {
		return sauces.data.map(transformSauces)
	};

	getBasket = () => {
		return transformBasket(basket.data)
	};

	addItem = (product) => {
		const {price} = product;

		console.log(price);

		basket.data.price += price;
		basket.data.items.push(product);

		return transformBasket(basket.data);
	};

	removeItem = (product) => {
		const {price} = product;
		let findIndexProduct = basket.data.items.findIndex(item => {
			return item.id === product.id && item.size === product.size;
		});

		basket.data.price -= price;
		basket.data.items.splice(findIndexProduct, 1);

		return transformBasket(basket.data);
	};
}