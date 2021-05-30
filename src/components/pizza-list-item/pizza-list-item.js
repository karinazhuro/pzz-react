import React, {Component} from 'react';

import enumTranslations from '../../utils/enumTranslations';
import {Consumer} from "../pizzas-service-context";
import PizzaService from "../../services/pizza-service";

import './pizza-list-item.css';

export default class PizzaListItem extends Component {
  renderVariants(id, variants) {
    return variants.map(variant => {
      return <PizzaVariant key={variant.size}
                           id={id}
                           size={variant.size}
                           price={variant.price}
                           weight={variant.weight}
                           count={variant.count}
      />
    });
  };

  render() {
    const {id, photo, title, variants, description} = this.props;

    return (
      <div>
        <img src={photo} alt={title}/>
        <div className='pizzaInfo'>
          <h3>{title}</h3>
          {this.renderVariants(id, variants)}
        </div>
        <p className='desc'>{description}</p>
      </div>
    );
  };
};

const Counter = (props) => {
  const add = () => {
    return (
      <Consumer>
        {
          ({service}) => {
            // console.log(service.addItem)
          }
        }
      </Consumer>
    )
  };

  return (
    <div className='counter'>
      <button className='minus'
              onClick={() => {
              }}>-
      </button>
      <p>{props.count}</p>
      <button className='plus'
              onClick={add}>+
      </button>
    </div>
  );
};

const AddToCart = ({id, size}) => {
  const pizzaService = new PizzaService();

  const addItemToCart = (id, size) => {
    const formData = new FormData();

    formData.append('type', 'pizza');
    formData.append('id', id);
    formData.append('size', size);
    formData.append('dough', 'thin');

    return (
      <Consumer>
        {
          ({createCountablePizzas}) => {
            pizzaService.addItem(formData)
              .then(res => console.log(res))

          }
        }
      </Consumer>
    )
  };

  return (
    <button className='addToCart'
            id={id}
            size={size}
            onClick={() => addItemToCart(id, size)}>В корзину</button>
  );
};

const PizzaVariant = ({id, size, price, weight, count}) => {
  const content = count === 0 ?
    <AddToCart id={id} size={size}/> : <Counter count={count}/>;

  return (
    <div className='variant'>
      <div>
        <p>{enumTranslations(size)}</p>
        <p>{price}</p>
        <p>{weight}</p>
      </div>
      <div className='countPizzas'>
        {content}
      </div>
    </div>
  );
};