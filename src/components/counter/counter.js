import React from 'react';
import {Consumer} from "../pizzas-service-context";

import './counter.scss';

const Counter = ({count, id, size}) =>  {
	return (
		<Consumer>
			{
				({addItemToCart}) => {
					return (
						<div className='counter'>
							<button className='minus'
											onClick={(e) => addItemToCart(e, id, size)}>-
							</button>
							<p className='count'>{count}</p>
							<button className='plus'
											onClick={(e) => addItemToCart(e, id, size)}>+
							</button>
						</div>
					)
				}
			}
		</Consumer>
	);
};

export default Counter;