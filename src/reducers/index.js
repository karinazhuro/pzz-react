const initialState = {
	pizzas: [],
};

const reducer = (state = initialState, action) => {
	if (action.type === 'PIZZAS_LOADED') {
		return {
			...state,
			pizzas: action.payload,
		};
	} else {
		return state;
	}
};

export default reducer;