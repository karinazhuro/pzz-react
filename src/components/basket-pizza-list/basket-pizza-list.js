import React from "react";

import translationSizes from "../../utils/translation-sizes";
import {Consumer} from "../pizzas-service-context";
import Counter from "../counter";

import './basket-pizza-list.scss';

const BasketPizzaList = () => {
	return (
		<Consumer>
			{
				({countablePizzaList, onAddItem, onRemoveItem}) => {
					return countablePizzaList.map(item => {
						const {id, title, variants} = item;


						return variants.map(variant => {
							if (variant.count > 0) {
								const {size, count, price} = variant;
								const productData = {
									size,
									id,
									price,
									title,
								};

								// console.log(translationSizes.size);

								return (
									<div className='basketPizza' key={`${id}${size}`}>
										<p className='title'>{title}</p>
										<div className='variants'>
											<p className='size'>{translationSizes[size]}</p>
											<Counter count={count}
															 onPlusClick={() => onAddItem(productData)}
															 onMinusClick={() => onRemoveItem(productData)}/>
											<p className='price'>{(price / 10000).toFixed(2)}</p>
										</div>
									</div>
								);
							}
						})
					});
				}
			}
		</Consumer>
	)
};

export default BasketPizzaList;