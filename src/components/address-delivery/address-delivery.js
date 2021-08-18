import React, {Component} from "react";
import {DebounceInput} from 'react-debounce-input';

import PizzaServiceMock from "../../services/pizza-service-mock";

import './address-delivery.scss';

export default class AddressDelivery extends Component {
	pizzaServiceMock = new PizzaServiceMock();

	constructor(props) {
		super(props);
		this.state = {
			streetsList: [],
			name: '',
			phone: '',
			street: '',
			house: '',
		};

		this.handleInputChange = this.handleInputChange.bind(this);
		this.handleSelectStreet = this.handleSelectStreet.bind(this);
		// this.renderDatalist = this.renderDatalist.bind(this);
		// this.handleSubmit = this.handleSubmit.bind(this);
	}


	handleInputChange(e) {
		const target = e.target;
		const name = target.name;

		this.setState({
			[name]: target.value,
		});
	};

	async handleSelectStreet(e) {
		const streetsList = await this.pizzaServiceMock.getStreets();
		const street = e.target.value;

		this.setState({
			streetsList,
			street,
		})
	};

	renderDatalistStreets = (streetsList, subStreet) => {
		return streetsList.map(street => {
			const findStreet = street.title.toLowerCase().startsWith(subStreet.toLowerCase());

			if (findStreet) {
				const {id, title} = street;

				return <option key={id}
											 value={title}>
					{title}
				</option>
			}
		})
	};

	// handleSubmit(event) {
	// 	alert('Отправленное имя: ' + this.state.name);
	// 	event.preventDefault();
	// }

	render() {
		const {name, phone, street, house, streetsList} = this.state;

		return (
			<div className='addressDelivery'>
				<h2 className='titleDelivery'>Адрес доставки</h2>
				<form className='addressForm'>
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
													 onChange={this.handleSelectStreet}/>
						<datalist id='street'>
							{this.renderDatalistStreets(streetsList, street)}
						</datalist>
					</label>
					<label>Дом
						<DebounceInput name='house'
													 type='text'
													 list='house'
													 value={house}
													 minLength={2}
													 debounceTimeout={300}
													 onChange={this.handleSelectStreet}/>
						<datalist id='house'>
							{this.renderDatalistStreets(streetsList, street)}
						</datalist>
					</label>
				</form>
			</div>
		);
	}
};