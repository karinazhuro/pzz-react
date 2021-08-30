const transformRegion = (region) => {
	const {id, title, region_id} = region;

	return {
		id,
		title,
		regionId: region_id,
	}
};

export default transformRegion;
