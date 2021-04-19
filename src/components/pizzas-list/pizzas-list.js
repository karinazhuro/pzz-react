import React, {Component} from 'react';

// import PizzaService from "../../services/pizza-service";
import PizzaListItem from "../pizza-list-item";
import Spinner from "../spinner";

class PizzasList extends Component {
  // pizzaService = new PizzaService();

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
      return <Spinner />
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
          })}
      </ul>
    );
  };
}

export default PizzasList;