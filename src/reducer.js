import {createStore} from 'redux';

const reducer = (state = 0, action) => {
	switch (action.type) {
		case 'PIZZAS_LOADED':
			return state + 1;

		default:
			return state;
	}
};

const store = createStore(reducer);

document.addEventListener("DOMContentLoaded", () =>{});