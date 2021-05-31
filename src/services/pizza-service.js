export default class PizzaService {
	_apiUrl = `https://pzz.by/api/v1`;

	getResource = async (url, method, body) => {
		const res = await fetch(`${this._apiUrl}${url}`, {
			method,
			body,
		});

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

	addItem = async (formData) => {
		const res = await this.getResource(`/basket/add-item`, 'POST', formData);
		return this._transformCart(res.response.data);
	};

	removeItem = async () => {
		const res =  await this.getResource(`/basket/remove-item`);
		return this._transformCart(res.response.data);
	};

	_transformPizza = (pizza) => {
		return {
			id: pizza.id.toString(),
			photo: pizza.photo_small,
			title: pizza.title,
			description: pizza.anonce,
			variants: this._variantsPizzas(pizza),
		};
	};

	_transformCart = (cart) => {
		return {
			price: (cart.price  / 10000).toFixed(2),
			items: cart.items.map(item => ({
				id: item.id,
				size: item.size,
				title: item.title,
				price: (item.price / 10000).toFixed(2),
			}))
		}
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