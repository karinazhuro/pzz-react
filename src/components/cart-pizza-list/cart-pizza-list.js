import {Consumer} from "../pizzas-service-context";

import CartPizzaListItem from "../cart-pizza-list-item";

import './cart-pizza-list.scss';

const CartPizzaList = () => {
	const renderItem = (basketPizzaList) => {
		return basketPizzaList.map(pizza => {
			const {id, size} = pizza;

			return (
				<CartPizzaListItem key={`${id}-${size}`}
													 product={pizza}/>
			)
		})
	};

	return (
		<div className='pizzasBasket'>
			<Consumer>
				{
					({basketPizzaList}) => {
						return renderItem(basketPizzaList)
					}
				}
			</Consumer>
		</div>
	)
};

export default CartPizzaList;