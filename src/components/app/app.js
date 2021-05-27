import React, {Component} from 'react';

import PizzaService from "../../services/pizza-service";
import {Provider} from "../pizzas-service-context";
import Header from "../header";
import PizzasList from "../pizzas-list";
import Spinner from "../spinner";

export default class App extends Component {
  pizzaService = new PizzaService();

  state = {
    pizzasList: [],
    countablePizzaList: [],
    basket: [],
  };

  componentDidMount() {
    this.init();
  };

  async init() {
    const pizzasListAsync = this.pizzaService.getPizzas();
    const basketAsync = this.pizzaService.getBasket();
    const pizzasList = await pizzasListAsync;
    const basket = await basketAsync;

    this.setState({
      pizzasList,
      basket,
      countablePizzaList: this.createCountablePizzas(
        pizzasList, basket),
    });
  };

  getVariantCountInBasket(id, size, basketItems) {
    let count = 0;

    for (let items of basketItems) {
      if (items.id === id && items.size === size) {
        count += 1;
      }
    }

    return count;
  };

  createCountablePizzas(pizzas, basket) {
    return pizzas.map(pizza => {
      return {
        ...pizza,
        variants: pizza.variants.map(variant => ({
          ...variant,
          count: this.getVariantCountInBasket(pizza.id, variant.size, basket.items),
        })),
      };
    });
  };

  render() {
    const {pizzasList, basket, countablePizzaList} = this.state;

    if (pizzasList.length === 0) {
      return <Spinner/>;
    }

    return (
      <Provider value={{
        service: this.pizzaService,
        basket: basket.price,
        countablePizzaList
      }}>
        <div>
          <Header/>
          <PizzasList/>
        </div>
      </Provider>
    );
  };
};