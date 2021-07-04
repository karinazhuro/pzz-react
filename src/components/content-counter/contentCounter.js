import React from "react";

import AddToBasket from "../add-to-basket";
import Counter from "../counter";

const ContentCounter = ({productData, count, onAddItem, onRemoveItem}) => {
	return (
		count === 0 ?
			<AddToBasket onAddItem={() => onAddItem(productData)}/> :
			<Counter count={count}
							 onPlusClick={() => onAddItem(productData)}
							 onMinusClick={() => onRemoveItem(productData)}/>
	)
};

export default ContentCounter;