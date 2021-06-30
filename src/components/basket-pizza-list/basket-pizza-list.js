import React from "react";

import enumTranslations from "../../utils/translation-sizes";
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

								return (
									<div className='basketPizza' key={`${id}${size}`}>
										<p className='title'>{title}</p>
										<div className='variants'>
											<p className='size'>{enumTranslations(size)}</p>
											<Counter count={count}
															 onMinusClick={() => onRemoveItem(id, size)}
															 onPlusClick={() => onAddItem(id, size)}/>
											<p className='price'>{price}</p>
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