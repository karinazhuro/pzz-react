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
		const res = await
			this.getResource(`/pizzas?load=ingredients,filters&filter=meal_only:0&order=position:asc`);
		return res.response.data.map(this._transformPizza);
	};

	_transformPizza = (pizza) => {
		return {
			id: pizza.id,
			title: pizza.title,
			bigSize: pizza.is_big,
			bigPrice: pizza.big_price,
			bigWeight: pizza.big_weight,
			mediumSize: pizza.is_medium,
			mediumPrice: pizza.medium_price,
			mediumWeight: pizza.medium_weight,
			thinSize: pizza.is_thin,
			thinPrice: pizza.thin_price,
			thinWeight: pizza.thin_weight,
			anonce: pizza.anonce,
		};
	};
}
