const transformBasket = (basket) => {
	const {price, quantityPizzas, items} = basket;

	return {
		price,
		quantityPizzas,
		items: items.map(item => {
			const {type, id, size, title, price} = item;

			return {
				type,
				id,
				size,
				title,
				price,
			}
		}),
	};
};

export default transformBasket;