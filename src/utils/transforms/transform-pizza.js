import EnumSizes from "../enums/enum-sizes";
import EnumTypes from "../enums/enum-types";

const transformPizza = (pizza) => {
  const {id, photo_small, title, anonce} = pizza;

  return {
    type: EnumTypes.pizza,
    id: id.toString(),
    photo: photo_small,
    title,
    description: anonce,
    variants: _variantsPizzas(pizza),
  };
};

const _variantsPizzas = (pizza) => {
  let variants = [];

  if (pizza.is_big) {
    variants.push(_variantsData(pizza, EnumSizes.big))
  }
  if (pizza.is_medium) {
    variants.push(_variantsData(pizza, EnumSizes.medium))
  }
  if (pizza.is_thin) {
    variants.push(_variantsData(pizza, EnumSizes.thin))
  }

  return variants;
};

const _variantsData = (pizza, size) => {
  return {
    size: size,
    price: pizza[`${size}_price`],
    weight: pizza[`${size}_weight`],
  }
};

export default transformPizza;