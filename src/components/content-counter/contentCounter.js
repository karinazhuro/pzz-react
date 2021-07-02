import React from "react";

import EnumTypes from "../../utils/enum-types";
import AddToBasket from "../add-to-basket";
import Counter from "../counter";

const ContentCounter = ({productData, count, onAddItem, onRemoveItem, id, size}) => {
	// console.log(dataVar)

	return (
		count === 0 ?
			<AddToBasket onAddItem={() => onAddItem(productData)}/> :
			<Counter count={count}
							 onPlusClick={() => onAddItem(EnumTypes.pizza, id, size)}
							 onMinusClick={() => onRemoveItem(EnumTypes.pizza, id, size)}/>
	)
};

export default ContentCounter;