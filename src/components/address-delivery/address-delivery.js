import React, {Component} from "react";

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
		// this.handleSubmit = this.handleSubmit.bind(this);
		this.handleSelectStreet = this.handleSelectStreet.bind(this);
	}

	componentDidMount() {
		this.init();
	};

	async init() {
		const streetsList = await this.pizzaServiceMock.getStreets();

		this.setState({
			streetsList,
		})
	};

	handleInputChange(event) {
		const target = event.target;
		const name = target.name;

		this.setState({
			[name]: event.target.value,
		});
	};

	handleSelectStreet(event, streetsList) {
		// const {streetsList} = this.state;

		console.log(streetsList)

	};

	// handleSubmit(event) {
	// 	alert('Отправленное имя: ' + this.state.name);
	// 	event.preventDefault();
	// }

	render() {
		const {name, phone, streetsList} = this.state;

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
						<input name="street"
									 type="text"
									 list="datalistStreet"
									 onChange={() => this.handleSelectStreet(streetsList)}/>
						{/*<datalist id="datalistStreet"></datalist>*/}
					</label>
					{/*<input type="submit" value="Отправить"/>*/}
				</form>
			</div>
		);
	}
};