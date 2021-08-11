const transformSauces = (sauce) => {
	return {
		id: sauce.id,
		photo: sauce.photo_small,
		price: sauce.price,
		title: sauce.title,
	};
};

export default transformSauces;