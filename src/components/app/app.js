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
    basket: {
      price: 0,
      items: {},
    },
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
        pizzasList, basket.items),
    });
  }

  createCountablePizzas(pizzas, basketItems) {
    return pizzas.map(pizza => {
      return {
        id: pizza.id,
        photo: pizza.photo,
        title: pizza.title,
        description: pizza.description,
        variants: pizza.variants.map(variant => ({
          size: variant.size,
          price: variant.price,
          weight: variant.weight,
          count: 0,
        }))
      };
    });
  };

  render() {
    const {pizzasList, basket, countablePizzaList} = this.state;

    if (pizzasList.length === 0) {
      return <Spinner/>;
    }

    return (
      <Provider value={{basket, countablePizzaList}}>
        <div>
          <Header/>
          <PizzasList/>
        </div>
      </Provider>
    );
  };
};