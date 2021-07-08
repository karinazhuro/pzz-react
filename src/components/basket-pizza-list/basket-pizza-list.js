import React from "react";
import {Consumer} from "../pizzas-service-context";

import './basket-pizza-list.scss';

const BasketPizzaList = () => {
	return (
		<Consumer>
			{
				({countablePizzaList, onAddItem, onRemoveItem, basket}) => {
					const collection = [];

					countablePizzaList.map(pizza => {
						const {id, title, variants} = pizza;

						variants.map(variant => {
							const {size, price} = variant;

							if (variant.count === 1) {

							}
						})

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

					// console.log(collection)
				}
			}
		</Consumer>
	)
};

export default BasketPizzaList;