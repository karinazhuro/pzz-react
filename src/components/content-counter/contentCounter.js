import React from "react";

import AddToBasket from "../add-to-basket";
import Counter from "../counter";

const ContentCounter = ({productData, quantity, onAddItem, onRemoveItem}) => {
	// console.log(productData)
	return (
		quantity === 0 ?
			<AddToBasket onAddItem={() => onAddItem(productData)}/> :
			<Counter quantity={quantity}
							 onPlusClick={() => onAddItem(productData)}
							 onMinusClick={() => onRemoveItem(productData)}/>
	)
};

export default ContentCounter;