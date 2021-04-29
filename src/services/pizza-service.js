export default class PizzaService {
	_apiUrl = `https://pzz.by/api/v1`;

	getResource = async (url) => {
		const res = await fetch(`${this._apiUrl}${url}`);

		if (!res.ok) {
			throw new Error(`Could not fetch ${url}, received ${res.status}`);
		}

		return await res.json();
	};

	getPizzas = async () => {
		const res = await this.getResource(`/pizzas?load=ingredients,filters&filter=meal_only:0&order=position:asc`);
		return res.response.data.map(this._transformPizza);
	};

	getBasket = async () => {
		const res = await this.getResource(`/basket`);
		return res.response.data;
	};

	_transformPizza = (pizza) => {
		return {
			id: pizza.id,
			photo: pizza.photo_small,
			title: pizza.title,
			description: pizza.anonce,
			variants: this._variantsPizzas(pizza),
		};
	};

	_variantsPizzas = (pizza) => {
		let variants = [];
		const pizzasSizes = new Map([
			['big', 'big'],
			['medium', 'medium'],
			['thin', 'thin']
		]);

		if (pizza.is_big === 1) {
			variants.push(this._variantsData(pizza, pizzasSizes.get('big')))}
		if (pizza.is_medium === 1) {
			variants.push(this._variantsData(pizza, pizzasSizes.get('medium')))}
		if (pizza.is_thin === 1) {
			variants.push(this._variantsData(pizza, pizzasSizes.get('thin')))}

		return variants;
	};

	_variantsData = (pizza, size) => {
		return {
			size: size,
			price: (pizza[`${size}_price`] / 10000).toFixed(2),
			weight: pizza[`${size}_weight`],
		}
	}
}