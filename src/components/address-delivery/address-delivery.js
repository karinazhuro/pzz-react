import React, {Component} from "react";
import {Consumer} from "../pizzas-service-context";
import {DebounceInput} from 'react-debounce-input';

import OptionSelector from "../option-selector";
import denominationPrice from "../../utils/denomination-price";
import EnumTimeOrder from "../../utils/enums/enum-time-order";
import EnumDelivery from "../../utils/enums/enum-delivery";
import EnumPayment from "../../utils/enums/enum-payment";
import TranslationTimeOrder from "../../utils/translation/translation-time-order";
import TranslationDelivery from "../../utils/translation/translation-delivery";
import TranslationPayment from "../../utils/translation/translation-payment";

import './address-delivery.scss';

export default class AddressDelivery extends Component {
	constructor(props) {
		super(props);

		this.state = {
			name: '',
			phone: '+375',
			street: '',
			house: '',
			flat: '',
			entrance: '',
			floor: '',
			doorphone: '',
			comment: '',
			timeOrder: '',
			delivery: '',
			payment: '',
		};

		this.handleInputChange = this.handleInputChange.bind(this);
		this.onSubmitForm = this.onSubmitForm.bind(this);
	}

	handleInputChange(e, func) {
		const target = e.target;
		const name = target.name;
		const value = target.value;

		this.setState({
			[name]: value,
		});

		if (!func) return;
		else func(value);
	};

	renderDatalistStreets = (streetsList) => {
		return streetsList.map(street => {
			const {id, title} = street;

			return <option key={id}>{title}</option>
		})
	};

	renderDatalistHouses = (housesList) => {
		return housesList.map(house => {
			const {id, title} = house;

			return <option key={id}>{title}</option>
		})
	};

	onSelectStreet = (streetsList, onGetNumberHouses, streetValue) => {
		return streetsList.map(street => {
			const {id, title} = street;

			if (title === streetValue) onGetNumberHouses(id);
		})
	};

	onSelectHouse = (housesList, onGetHouse, houseValue) => {
		return housesList.map(house => {
			const {title, id} = house;

			if (houseValue === title) onGetHouse(id);
		})
	};

	onSubmitForm = (e) => {
		e.preventDefault();
		console.log(0)
	};

	render() {
		const {
			name, phone,
			street, house, flat, entrance, floor, doorphone,
			comment,
		} = this.state;

		return (
			<div className='addressDelivery'>
				<h2 className='titleDelivery'>Адрес доставки</h2>
				<Consumer>
					{
						({basket, streetsList, housesList, onGetStreets, onGetNumberHouses, onGetHouse}) => {
							return (
								<React.Fragment>
									<form className='addressForm'
												onSubmit={this.onSubmitForm}>
										<label className='labelName'>Ваше имя
											<input className='inputName'
														 name='name'
														 type="text"
														 value={name}
														 onChange={this.handleInputChange}/>
										</label>
										<label className='labelName'>Ваш мобильный телефон
											<input className='inputName'
														 name='phone'
														 type="tel"
												// pattern="[0-9]{9}"
														 value={phone}
														 maxLength={13}
														 onChange={this.handleInputChange}/>
										</label>
										<div className='address'>
											<label className='labelName'>Улица
												<DebounceInput className='inputName'
																			 name='street'
																			 type='text'
																			 list='street'
																			 value={street}
																			 minLength={2}
																			 debounceTimeout={300}
																			 onChange={(e) =>
																				 this.handleInputChange(e,
																					 (subString) => onGetStreets(subString))}
																			 onBlur={() => this.onSelectStreet(streetsList, onGetNumberHouses, street)}/>
												<datalist id='street'>
													{this.renderDatalistStreets(streetsList)}
												</datalist>
											</label>
											<label className='labelName addressDetail'>Дом
												<input className='inputName'
															 name='house'
															 type='text'
															 list='house'
															 value={house}
															 onChange={(e) =>
																 this.handleInputChange(e)}
															 onBlur={() => this.onSelectHouse(housesList, onGetHouse, house)}/>
												<datalist id='house'>
													{this.renderDatalistHouses(housesList)}
												</datalist>
											</label>
											<label className='labelName addressDetail'>Квартира
												<input className='inputName'
															 name='flat'
															 type="text"
															 value={flat}
															 onChange={this.handleInputChange}/>
											</label>
											<label className='labelName addressDetail'>Подъезд
												<input className='inputName'
															 name='entrance'
															 type="text"
															 value={entrance}
															 onChange={this.handleInputChange}/>
											</label>
											<label className='labelName addressDetail'>Этаж
												<input className='inputName'
															 name='floor'
															 type="text"
															 value={floor}
															 onChange={this.handleInputChange}/>
											</label>
											<label className='labelName addressDetail'>Домофон
												<input className='inputName'
															 name='doorphone'
															 type="text"
															 value={doorphone}
															 onChange={this.handleInputChange}/>
											</label>
										</div>
										<label className='labelName labelComment'>Комментарий к заказу
											<textarea className='inputName inputComment'
																name='comment'
																value={comment}
																rows={2}
																onChange={this.handleInputChange}/>
										</label>
										<div className='optionSelect'>
											<OptionSelector name={'timeOrder'}
																			option={EnumTimeOrder}
																			translation={TranslationTimeOrder}
																			handleInputChange={this.handleInputChange}/>
											<OptionSelector name={'delivery'}
																			option={EnumDelivery}
																			translation={TranslationDelivery}
																			handleInputChange={this.handleInputChange}/>
											<OptionSelector name={'payment'}
																			option={EnumPayment}
																			translation={TranslationPayment}
																			handleInputChange={this.handleInputChange}/>
										</div>
										<div className='totalPrice'>
											<p className='total'>Итого: &nbsp;
												<span className='price'>
											{denominationPrice(basket.price)} р.
										</span>
											</p>
											<p className='note'>Оплата в белорусских рублях</p>
										</div>
										<input className='submit'
													 type="submit"
													 value="Отправить"/>
									</form>
								</React.Fragment>
							)
						}
					}
				</Consumer>
			</div>
		);
	}
};