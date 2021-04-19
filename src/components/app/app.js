import React from 'react';

import Header from "../header";
import PizzasList from "../pizzas-list";
import PizzaService from "../../services/pizza-service";

const App = () => {
	const pizzaService = new PizzaService();

	return (
		<div>
			<Header/>
			<PizzasList service={pizzaService}/>
		</div>
	)
};

export default App;