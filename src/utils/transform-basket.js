const transformBasket = (basket) => {
	console.log(basket)
	return {
		price: basket.price,
		items: basket.items.map(item => ({
			id: item.id,
			size: item.size,
			title: item.title,
			price: item.price,
		}))
	};
};

export default transformBasket;