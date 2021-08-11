import EnumTypes from "./enum-types";
import EnumSizes from "./enum-sizes";

const transformSauces = (sauce) => {
	return {
		type: EnumTypes.sauce,
		id: sauce.id.toString(),
		size: EnumSizes["big"],
		photo: sauce.photo_small,
		price: sauce.price,
		title: sauce.title,
	};
};

export default transformSauces;