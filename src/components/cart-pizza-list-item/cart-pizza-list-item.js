import {Consumer} from "../pizzas-service-context";
import translationSizes from "../../utils/translation/translation-sizes";
import ContentCounter from "../content-counter";
import denominationPrice from "../../utils/denomination-price";

import './cart-pizza-list-item.scss';

const CartPizzaListItem = ({product}) => {
	const {type, id, size, title, price, quantity} = product;
	const productData = {
		type,
		id,
		size,
		title,
		price,
	};

	return (
	<div className='pizzaBasket'>
		<h3 className='title'>{title}</h3>
		<div className='details'>
			<p className='size'>{translationSizes[size]}</p>
				<Consumer>
					{
						({onAddItem, onRemoveItem}) => {
							return <ContentCounter quantity={quantity}
															onAddItem={onAddItem}
															onRemoveItem={onRemoveItem}
															productData={productData}/>
						}
					}
				</Consumer>
			<p className='price'>{denominationPrice(price * quantity)}</p>
		</div>
	</div>
	)
}

export default CartPizzaListItem;