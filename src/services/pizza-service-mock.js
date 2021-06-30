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
	}
}