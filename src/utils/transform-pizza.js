import EnumSizes from "./enum-sizes";
import EnumTypes from "./enum-types";

const transformPizza = (pizza) => {
  return {
    type: EnumTypes.pizza,
    id: pizza.id.toString(),
    photo: pizza.photo_small,
    title: pizza.title,
    description: pizza.anonce,
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