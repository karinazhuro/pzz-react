import AddToCart from "../add-to-cart";
import Counter from "../counter";

const ContentCounter = ({productData, quantity, onAddItem, onRemoveItem}) => {
	return (
		quantity === 0 ?
			<AddToCart onAddItem={() => onAddItem(productData)}/> :
			<Counter quantity={quantity}
							 onPlusClick={() => onAddItem(productData)}
							 onMinusClick={() => onRemoveItem(productData)}/>
	)
};

export default ContentCounter;