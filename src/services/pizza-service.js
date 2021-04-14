export default class PizzaService {
	_apiUrl = `https://pzz.by/api/v1`;

	getResource = async (url) => {
		const res = await fetch(`${this._apiUrl}${url}`);

		if (!res.ok) {
			throw new Error(`Could not fetch ${url}, received ${res.status}`);
		}

		return await res.json();
	}

	getPizzas = async () => {
		const res = await this.getResource(`/pizzas?load=ingredients,filters&filter=meal_only:0&order=position:asc`);
		console.log(res)
	}
}
