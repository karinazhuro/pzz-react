import pizzas from '../assets/pizzas.json';
import sauces from '../assets/sauces.json';
import transformPizza from "../utils/transform-pizza";

export default class PizzaServiceMock {
  getPizzas = () => {
		return pizzas.response.data.map(transformPizza);
    };

    // return pizzas.response.data.map(transformPizza);
}