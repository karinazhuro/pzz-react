import './add-to-cart.scss';

const AddToCart = ({id, size, onAddItem}) => {
	return (
		<button className='addToCart'
						id={id}
						sizevariant={size}
						onClick={() => onAddItem(id, size)}> В корзину</button>
	);
};

export default AddToCart;