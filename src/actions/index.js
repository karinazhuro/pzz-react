const pizzasLoaded = (pizzas) => {
  return {
    type: 'PIZZAS_LOADED',
    payload: pizzas,
  }
};

export {
  pizzasLoaded,
}