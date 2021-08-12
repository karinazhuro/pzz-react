import React from "react";

import {Consumer} from "../pizzas-service-context";
import declensionsOfWords from "../../utils/declensions-of-words";
import SaucesList from "../sauces-list";

const BasketSaucesList = () => {
	return (
		<div className='sauces'>
			<Consumer>
				{
					({basket}) => {
						const {quantityPizzas} = basket;

						return (
							<React.Fragment>
								<h2 className='freeSauce'>
									Выберите {quantityPizzas}&nbsp;
									{declensionsOfWords(quantityPizzas)}</h2>
							</React.Fragment>
						)
					}
				}
			</Consumer>
			<SaucesList/>

		</div>
	)
};

export default BasketSaucesList;