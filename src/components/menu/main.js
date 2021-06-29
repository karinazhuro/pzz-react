import React from 'react';
import ScrollableAnchor from "react-scrollable-anchor";

import PizzasList from "../pizzas-list";
import SaucesList from "../sauces-list";
import Navigation from "../navigation";

import './menu.scss';

const Main = () => {
	return (
		<main>
			<Navigation/>

			<ScrollableAnchor id='pizzas'>
				<PizzasList/>
			</ScrollableAnchor>
			<ScrollableAnchor id='sauces'>
				<SaucesList/>
			</ScrollableAnchor>
		</main>
	)
}

export default Main;