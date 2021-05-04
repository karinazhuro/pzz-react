import React, {Component} from 'react';

import PizzaService from "../../services/pizza-service";
import Header from "../header";
import PizzasList from "../pizzas-list";
import {Provider} from "../pizzas-service-context";

export default class App extends Component {
  pizzaService = new PizzaService();

  state = {
    cart: {
      price: 0,
    }
  };

  componentDidMount() {
    this.pizzaService
      .getBasket()
      .then((cart) => {
        this.setState({
          cart,
        });
      });
  };

  render() {
    const {cart} = this.state;

    return (
      <Provider value={cart}>
        <div>
          <Header/>
          <PizzasList/>
        </div>
      </Provider>
    );
  };
};