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
		return this._transformCart(res.response.data);
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

	_transformCart = (cart) => {
		const size = cart.items.map(item => item.size).toString();
		const id = cart.items.map(item => Number(item.id)).toString();

		return {
			price: cart.price,
			items: {
				size: size,
				id: id,
			},
		};
	};

	_variantsPizzas = (pizza) => {
		let variants = [];

		if (pizza.is_big === 1) {
			variants.push(this._variantsData(pizza, 'big'))
		}
		if (pizza.is_medium === 1) {
			variants.push(this._variantsData(pizza, 'medium'))
		}
		if (pizza.is_thin === 1) {
			variants.push(this._variantsData(pizza, 'thin'))
		}

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