import PizzaService from "../services/pizza-service";
import store from "../store";

const initialState = {
	pizzas: [],
};

const reducer = (state = initialState, action) => {
	if (action.type === 'PIZZAS_LOADED') {
		return {
			pizzas: action.payload,
		};
	} else {
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