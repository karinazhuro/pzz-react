import React from "react";
import {Consumer} from "../pizzas-service-context";

import './basket-pizza-list.scss';

const BasketPizzaList = () => {
	return (
		<Consumer>
			{
				({countablePizzaList, onAddItem, onRemoveItem, basket}) => {
					return countablePizzaList.map(item => {
						const items = basket.items;
						const collection = [];

						// console.log(items)

						for (let i = 0; i < items.length; i++) {
							const item = items[i];
							const {id, title, size, price} = item;

							for (let j = 0; j <= collection.length; j++) {
								if (collection.length === 0) {
										collection.push({
											id,
											title,
											variants: []
										})
								}
							}
						}

						console.log(collection)

						// const {id, size, title, price} = item;

						// 				const productData = {
						// 					id,
						// 					size,
						// 					title,
						// 					price,
						// 				};

						// return (
						// <div className='basketPizza' key={`${id}${size}`}>
						// {/*// 						<p className='title'>{title}</p>*/}
						// {/*// 						<div className='variants'>*/}
						// {/*// 							<p className='size'>{translationSizes[size]}</p>*/}
						// {/*// 							<Counter count={count}*/}
						// {/*// 											 onPlusClick={() => onAddItem(productData)}*/}
						// {/*// 											 onMinusClick={() => onRemoveItem(productData)}/>*/}
						// {/*// 							<p className='price'>{(price / 10000).toFixed(2)}</p>*/}
						// /*// 					</div>*/
						// </div>
						// );
					});
				}
			}
		</Consumer>
	)
};

export default BasketPizzaList;