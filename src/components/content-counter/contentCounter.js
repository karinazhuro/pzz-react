import React from "react";

import EnumTypes from "../../utils/enumTypes";
import AddToBasket from "../add-to-basket";
import Counter from "../counter";

const ContentCounter = ({count, onAddItem, onRemoveItem, id, size}) => {
	return (
		count === 0 ?
			<AddToBasket onAddItem={() => onAddItem(EnumTypes.pizza, id, size)}/> :
			<Counter count={count}
							 onPlusClick={() => onAddItem(EnumTypes.pizza, id, size)}
							 onMinusClick={() => onRemoveItem(EnumTypes.pizza, id, size)}/>
	)
};

export default ContentCounter;