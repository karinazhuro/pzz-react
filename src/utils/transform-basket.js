const transformBasket = (basket) => {
	return {
		price: (basket.price / 10000).toFixed(2),
		items: basket.items.map(item => ({
			id: item.id,
			size: item.size,
			title: item.title,
			price: (item.price / 10000).toFixed(2),
			count: 0,
		}))
	};
};

export default transformBasket;