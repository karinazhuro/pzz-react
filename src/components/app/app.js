import React, {Component} from 'react';
import {BrowserRouter, Route} from "react-router-dom";

import PizzaService from "../../services/pizza-service";
import {Provider} from "../pizzas-service-context";
import Header from "../header";
import PizzasList from "../pizzas-list";
import Spinner from "../spinner";
import Basket from "../basket";

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
    const saucesAsync = this.pizzaService.getSauces();

    const pizzasList = await pizzasListAsync;
    const basket = await basketAsync;
    const sauces = await saucesAsync;

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

  onAddItem = async (id, size) => {
    const {pizzasList} = this.state;

    await this.pizzaService.addItem(id, size)
      .then(res => {
        this.setState({
          basket: res,
          countablePizzaList: this.createCountablePizzas(pizzasList, res),
        });
      });
  };

  onRemoveItem = async (id, size) => {
    const {pizzasList} = this.state;

    await this.pizzaService.removeItem(id, size)
      .then(res => {
        this.setState({
          basket: res,
          countablePizzaList: this.createCountablePizzas(pizzasList, res),
        });
      });
  };

  render() {
    const {pizzasList, basket, countablePizzaList} = this.state;

    if (pizzasList.length === 0) {
      return <Spinner/>;
    }

    return (
      <Provider value={{
        basket,
        countablePizzaList,
        onAddItem: this.onAddItem,
        onRemoveItem: this.onRemoveItem,
      }}>
        <BrowserRouter>
          <div>
            <Header/>
            <Route path='/' component={PizzasList} exact/>
            <Route path='/basket' component={Basket}/>
          </div>
        </BrowserRouter>
      </Provider>
    );
  };
};