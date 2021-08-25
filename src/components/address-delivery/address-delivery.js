import React, {Component} from "react";
import {Consumer} from "../pizzas-service-context";
import {DebounceInput} from 'react-debounce-input';

import './address-delivery.scss';

export default class AddressDelivery extends Component {
	constructor(props) {
		super(props);

		this.state = {
			name: '',
			phone: '',
			street: '',
			house: '',
		};

		this.handleInputChange = this.handleInputChange.bind(this);
		// this.handleSelectHouse = this.handleSelectHouse.bind(this);
		// this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleInputChange(e, func) {
		const target = e.target;
		const name = target.name;

		this.setState({
			[name]: target.value,
		});

		if (!func) return;
		else func(target.value);
	};

	renderDatalistStreets = (streetsList, onGetNumberHouses) => {
		return streetsList.map(street => {
			const {id, title} = street;
			const getIdHouse = onGetNumberHouses(id);

			return (
				<option key={id}
								value={title}
								onClick={() => getIdHouse()}>
					{title}
				</option>)
		})
	};

	renderDatalistHouses = (housesList) => {
		// console.log(housesList)

		// return housesList.map(house => {
		// 	const {id, title} = house;
		//
		// 	return <option key={id}
		// 								 value={title}>{title}
		// 	</option>
		// })
	};

	// handleSubmit(event) {
	// 	alert('Отправленное имя: ' + this.state.name);
	// 	event.preventDefault();
	// }

	render() {
		const {name, phone, street, house} = this.state;

		return (
			<div className='addressDelivery'>
				<h2 className='titleDelivery'>Адрес доставки</h2>
				<form className='addressForm'>
					<Consumer>
						{
							({streetsList, housesList, onGetStreets, onGetNumberHouses}) => {
								return (
									<React.Fragment>
										<label>Ваше имя
											<input name='name'
														 type="text"
														 value={name}
														 onChange={this.handleInputChange}/>
										</label>
										<label>Ваш мобильный телефон
											<input name='phoneCode'
														 type="text"
														 value='+375'
														 readOnly={+375}/>
											<input name='phone'
														 type="tel"
														 pattern={/[0-9]/}
														 value={phone}
														 onChange={this.handleInputChange}/>
										</label>
										<label>Улица
											<DebounceInput name='street'
																		 type='text'
																		 list='street'
																		 value={street}
																		 minLength={2}
																		 debounceTimeout={300}
																		 onChange={(e) =>
																			 this.handleInputChange(e,
																				 (subStr) => onGetStreets(subStr))}/>
											<datalist id='street'>
												{this.renderDatalistStreets(streetsList, onGetNumberHouses)}
											</datalist>
										</label>
										<label>Дом
											<input name='house'
														 type='text'
														 list='house'
														 value={house}
														 onChange={(e) =>
															 this.handleInputChange(e)}
											/>
											<datalist id='house'>
												{this.renderDatalistHouses(housesList, house)}
											</datalist>
										</label>
									</React.Fragment>
								)
							}
						}
					</Consumer>
				</form>
			</div>
		);
	}
};