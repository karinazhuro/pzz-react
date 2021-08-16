const transformStreets = (street) => {
	const {id, title} = street;

	return {
		id,
		title,
	};
};

export default transformStreets;