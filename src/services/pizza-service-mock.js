import pizzas from '../assets/pizzas.json';
import sauces from '../assets/sauces.json';

export default class PizzaServiceMock {
	getPizzas = () => {
		return pizzas;
	}


}