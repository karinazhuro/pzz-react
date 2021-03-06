import EnumTypes from "../enums/enum-types";
import EnumSizes from "../enums/enum-sizes";

const transformSauces = (sauce) => {
	const {id, photo_small, price, title} = sauce;

	return {
		type: EnumTypes.sauce,
		id: id.toString(),
		size: EnumSizes.big,
		photo: photo_small,
		price: price,
		title: title,
	};
};

export default transformSauces;