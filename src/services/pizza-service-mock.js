import pizzas from '../assets/pizzas.json';
import sauces from '../assets/sauces.json';
import basket from '../assets/basket.json';
import addItem from '../assets/add.json';
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

	addItem = (item) => {
		const {id, description, title, type} = item;
		console.log(item)
		addItem.data.items.push({
			"type": type,
			id,
			// "size": size,
			"dough": "thin",
			"is_failure": 0,
			"is_3in2": false,
			"with_sauce": false,
			"parts": 1,
			"item_id": 0,
			"is_new": true,
			"auto_removed": false,
			"title": title,
			"free_sauces_count": 1,
			"is_new_recipe": 0,
			"to_remove": 0,
			"to_soft_remove": 0,
			"packed": 0,
			"prepared": 0,
			"is_free": 0,
			"original_product_price": 239000,
			"price": 239000,
			"target_discount_type": "none",
			"target_discount_amount": 0,
			"target_discount_percent": 0
		});

		return addItem.data;
	};
}