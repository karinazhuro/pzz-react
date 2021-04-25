import React, {Component} from 'react';

import PizzaService from "../../services/pizza-service";
import PizzaListItem from "../pizza-list-item";
import Spinner from "../spinner";

class PizzasList extends Component {
  pizzaService = new PizzaService();

  state = {
    pizzasList: null,
  };

  componentDidMount() {
    this.pizzaService
      .getPizzas()
      .then((pizzasList) => {
        this.setState({
          pizzasList,
        });
      });
  };

  renderItem = (arr) => {
    console.log(arr);

    return arr.map(({id, photo, title}) => {
      return (
        <li key={id}>
          <PizzaListItem
            photo={photo}
            title={title}/>
        </li>
      )
    })


  };

  render() {
    const {pizzasList} = this.state;

    if (!pizzasList) {
      return <Spinner/>
    }

    const item = this.renderItem(pizzasList);

    return (
      <ul>
        {item}
      </ul>
    );
  };
}

export default PizzasList;