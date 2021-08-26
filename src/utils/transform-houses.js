const transformHouses = (house) => {
	const {id, title, region_id, geo} = house;

	return {
		id,
		title,
		regionId: region_id,
		geo,
	}
};

export default transformHouses;