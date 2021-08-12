import React from 'react';
import ScrollableAnchor from "react-scrollable-anchor";

import PizzasList from "../pizzas-list";
import SaucesList from "../sauces-list";
import Navigation from "../navigation";

import './menu.scss';

const Menu = () => {
	return (
		<main>
			<Navigation/>

			<h2 className='titleBlock'>Пиццы</h2>
			<ScrollableAnchor id='pizzas'>
					<PizzasList/>
			</ScrollableAnchor>

			<h2 className='titleBlock'>Соусы</h2>
			<ScrollableAnchor id='sauces'>
				<SaucesList/>
			</ScrollableAnchor>
		</main>
	)
};

export default Menu;