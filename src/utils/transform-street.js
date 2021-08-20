const transformStreet = (street) => {
	const {id, title} = street;

	return {
		id,
		title,
	};
};

export default transformStreet;