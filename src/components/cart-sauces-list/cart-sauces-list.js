import React from "react";

import {Consumer} from "../pizzas-service-context";
import declensionsOfWords from "../../utils/declensions-of-words";
import SaucesList from "../sauces-list";

import "./cart-sauces-list.scss";

const CartSaucesList = () => {
	return (
		<div className='saucesBasket'>
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

export default CartSaucesList;