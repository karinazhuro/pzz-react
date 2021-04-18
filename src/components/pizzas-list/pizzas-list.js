import React, {Component} from 'react';

// import PizzaService from "../../services/pizza-service";
import PizzaListItem from "../pizza-list-item";

export default class PizzasList extends Component {
  // const pizzaService = new PizzaService();

  // componentDidMount() {
  //   this.pizzaService
  //     .getPizzas()
  //     .then((pizzasList) => {
  //       this.setState({
  //         pizzasList,
  //       });
  //     });
  // }

  render() {
    const {pizzas} = this.props;


    if (!pizzas) {
      // TODO: add spinner
      return <span>hi</span>
    }

    return (
      <ul>
        {
          pizzas.map((pizza) => {
            return (
              <li key={pizza.id}>
                <PizzaListItem pizza={pizza}/>
              </li>
            );
          })};
      </ul>
    );
  };
};