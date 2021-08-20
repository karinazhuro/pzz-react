import React, {Component} from "react";
import {Consumer} from "../pizzas-service-context";
import {DebounceInput} from 'react-debounce-input';

import './address-delivery.scss';

export default class AddressDelivery extends Component {
	constructor(props) {
		super(props);
		this.state = {
			streetsList: [],
			houseList: [],
			name: '',
			phone: '',
			street: '',
			house: '',
		};

		this.handleInputChange = this.handleInputChange.bind(this);
		this.handleSelectHouse = this.handleSelectHouse.bind(this);
		// this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleInputChange(e) {
		const target = e.target;
		const name = target.name;

		this.setState({
			[name]: target.value,
		});
	};

	async handleSelectStreet(service, e) {
		const value = e.target.value;
		const streetsList = await service.getStreets(value);

		if (value.length < 2) return;

		this.handleInputChange(e);
		this.setState({
			streetsList,
		})
	};

	async handleSelectHouse(service, e) {
		const housesList = await service.getHouses();

		this.handleInputChange(e);
		this.setState({
			housesList,
		})
	};

	renderDatalistStreets = (streetsList) => {
		return streetsList.map(street => {
			const {id, title} = street;

			return <option key={id}
										 value={title}
										 onClick={}>{title}
			</option>
		})
	};

	renderDatalistHouses = (housesList, house) => {
		// console.log(house)
		return housesList.map(house => {
			const {id, title} = house;

			return <option key={id}
										 value={title}>{title}
			</option>
		})
	};

	// handleSubmit(event) {
	// 	alert('Отправленное имя: ' + this.state.name);
	// 	event.preventDefault();
	// }

	render() {
		const {streetsList, houseList, name, phone, street, house} = this.state;
		// console.log(house)

		return (
			<div className='addressDelivery'>
				<h2 className='titleDelivery'>Адрес доставки</h2>
				<form className='addressForm'>
					<Consumer>
						{
							({service}) => {
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
																		 onChange={this.handleSelectStreet.bind(this, service)}/>
											<datalist id='street'>
												{this.renderDatalistStreets(streetsList)}
											</datalist>
										</label>
										<label>Дом
											<input name='house'
														 type='text'
														 list='house'
														 value={house}
														 onClick={this.handleSelectHouse.bind(this, service)}/>
											<datalist id='house'>
												{this.renderDatalistHouses(houseList, house)}
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