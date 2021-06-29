import EnumSizes from "./enum-sizes";

const transformPizza = (pizza) => {
  return {
    id: pizza.id.toString(),
    photo: pizza.photo_small,
    title: pizza.title,
    description: pizza.anonce,
    variants: _variantsPizzas(pizza),
  };
};

const _variantsPizzas = (pizza) => {
  let variants = [];

  if (pizza.is_big === 1) {
    variants.push(_variantsData(pizza, EnumSizes.big))
  }
  if (pizza.is_medium === 1) {
    variants.push(_variantsData(pizza, EnumSizes.medium))
  }
  if (pizza.is_thin === 1) {
    variants.push(_variantsData(pizza, EnumSizes.thin))
  }

  return variants;
};

const _variantsData = (pizza, size) => {
  return {
    size: size,
    price: (pizza[`${size}_price`] / 10000).toFixed(2),
    weight: pizza[`${size}_weight`],
  }
};

export default transformPizza