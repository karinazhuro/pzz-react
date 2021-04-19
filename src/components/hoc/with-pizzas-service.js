import React from "react";

import {Consumer} from '../pizzas-service-context';

const WithPizzasService = () => (Wrapped) => {
	return (props) => {
		return (
			<Consumer>
				{
					(pizzaService) => {
						return (
							<Wrapped {...props}
											 pizzaService={pizzaService}/>);
					}}
			</Consumer>
		);
	};
};

export default WithPizzasService;