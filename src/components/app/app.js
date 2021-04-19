import React from 'react';

import Header from "../header";
import PizzasList from "../pizzas-list";
import {Provider} from "../pizzas-service-context";
import PizzaService from "../../services/pizza-service";

const App = () => {
	const pizzaService = new PizzaService();

	return (
		<Provider value={pizzaService}>
			<Header/>
			<PizzasList/>
		</Provider>
	)
};

export default App;