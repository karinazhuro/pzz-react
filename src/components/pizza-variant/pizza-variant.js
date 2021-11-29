import {Consumer} from "../pizzas-service-context";
import translationSizes from "../../utils/translation/translation-sizes";
import denominationPrice from "../../utils/denomination-price";
import ContentCounter from "../content-counter";

import "./pizza-variant.scss";

const PizzaVariant = ({size, price, weight, quantity, id, product}) => {
	const {type, title} = product;
	const productData = {
		type,
		id,
		size,
		title,
		price,
	};

	return (
		<Consumer>
			{
				({onAddItem, onRemoveItem}) => {
					return (
						<div className='variant'>
							<div className='infoAboutVariant'>
								<p className='size'>{translationSizes[size]}</p>
								<p className='price'>{denominationPrice(price)}</p>
								<p className='weight'>{weight}</p>
							</div>
							<div className='countPizza'>
								{
									<ContentCounter quantity={quantity}
																	onAddItem={onAddItem}
																	onRemoveItem={onRemoveItem}
																	productData={productData}/>
								}
							</div>
						</div>
					)
				}
			}
		</Consumer>
	);
};

export default PizzaVariant;