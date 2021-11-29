import React from 'react';
import ScrollableAnchor, {configureAnchors} from "react-scrollable-anchor";

import Navigation from "../navigation";
import PizzasList from "../pizzas-list";
import SaucesList from "../sauces-list";

const Menu = () => {
	configureAnchors({offset: -110, scrollDuration: 200});

	return (
		<main>
			<Navigation/>

			<div className="menu">
				<ScrollableAnchor id='pizzas'>
					<PizzasList/>
				</ScrollableAnchor>
				<ScrollableAnchor id='sauces'>
					<SaucesList/>
				</ScrollableAnchor>
			</div>
		</main>
	)
};

export default Menu;