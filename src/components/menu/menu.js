import React from 'react';

import PizzasList from "../pizzas-list";
import SaucesList from "../saucesList";

import './menu.scss';

const Menu = () => {
	return (
		<main>
			<PizzasList/>
			<SaucesList/>
		</main>
	)
}

export default Menu;