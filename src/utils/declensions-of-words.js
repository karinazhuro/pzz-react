const declensionsOfWords = (number) => {
	switch (number) {
		case 1:
			return 'бесплатный соус';
		case 2:
		case 3:
		case 4:
			return 'бесплатных соуса';
		default:
			return 'бесплатных соусов';
	}
};

export default declensionsOfWords;