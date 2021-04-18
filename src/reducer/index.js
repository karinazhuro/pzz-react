import PizzaService from "../services/pizza-service";

const initialState = {
	pizzas: [],
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case 'PIZZAS_LOADED':
			return {
				pizzas: action.payload,
			};

		default:
			return state;
	}
};


document.addEventListener("DOMContentLoaded", () => {
	store.dispatch({type: 'PIZZAS_LOADED'});
});

const loaded = () => {
	const pizzaService = new PizzaService();

	pizzaService.getPizzas()
		.then(res => console.log(res));
};

store.subscribe(loaded);

export default reducer;