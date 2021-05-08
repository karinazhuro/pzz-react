import React, {Component} from 'react';

import enumTranslations from '../../utils/enumTranslations';

import './pizza-list-item.css';

export default class PizzaListItem extends Component {
  render() {
    const {id, photo, title, variants} = this.props;

    // const variant = variants.map((variant) => {
    //   return <PizzaVariant key={variant.size}
    //                        id={id}
    //                        variant={variant}/>
    // });

    const variant = variants.map(variant => {
      return {
        size: variant.size,
        price: variant.price,
        weight: variant.weight,
        count: 0,
      }
    });

    const mapVariant = {
      id: id,
      photo: photo,
      title: title,
      variants: [
        ...variant,
      ],
    };

    const renderVariants = (variant) => {
      return <PizzaVariant key={variant.variants.size}
                           size={variant.variants.size}
                           price={variant.variants.price}
                           weight={variant.variants.weight}/>
    };

    return (
      <div>
        <img src={photo} alt={title}/>
        <div className='pizzaInfo'>
          <h3>{title}</h3>
          {renderVariants(mapVariant)}
        </div>
      </div>
    );
  };
};

const PizzaVariant = ({size, price, weight}) => {
  // const {size, price, weight} = variant;

  return (
    <div className='variant'>
      <div className='info'>
        <p>{enumTranslations(size)}</p>
        <p>{price}</p>
        <p>{weight}</p>
      </div>
      <div className='countPizzas'>

      </div>
    </div>
  );
};

const Counter = () => {
  return (
    <div className='counter'>
      <button className='plus'
              onClick={() => {
              }}>+
      </button>
      <p>1</p>
      <button className='minus'
              onClick={() => {
              }}>-
      </button>
    </div>
  );
};

const AddToCart = ({id, size}) => {
  const addToCart = (id, size) => {
  };

  return (
    <button className='addToCart'
            id={id}
            sizes={size}
            onClick={() => addToCart(id, size)}>В корзину</button>
  );
};