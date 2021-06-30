const transformSauces = (sauce) => {
	return {
		id: sauce.id,
		photo: sauce.photo_small,
		price: (sauce.price / 10000).toFixed(2),
		title: sauce.title,
	};
};

export default transformSauces;