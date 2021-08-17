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
		};

		this.handleInputChange = this.handleInputChange.bind(this);
		this.handleSelectStreet = this.handleSelectStreet.bind(this);
		// this.handleSubmit = this.handleSubmit.bind(this);
	}


	handleInputChange(event) {
		const target = event.target;
		const name = target.name;

		this.setState({
			[name]: event.target.value,
		});
	};

	async handleSelectStreet() {
		const streetsList = await this.pizzaServiceMock.getStreets();

		console.log(streetsList)
	};

	// handleSubmit(event) {
	// 	alert('Отправленное имя: ' + this.state.name);
	// 	event.preventDefault();
	// }

	render() {
		const {name, phone} = this.state;

		return (
			<div className='addressDelivery'>
				<h2 className='titleDelivery'>Адрес доставки</h2>
				<form className='addressForm'
							onSubmit={this.handleSubmit}>
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
						<DebounceInput list=''
							minLength={2}
													 debounceTimeout={300}
													 onChange={this.handleSelectStreet}/>
						<datalist></datalist>
					</label>
					{/*<input type="submit" value="Отправить"/>*/}
				</form>
			</div>
		);
	}
};