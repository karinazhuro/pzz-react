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
			intercom: '',
			comment: '',
			timeOrder: '',
			delivery: '',
			payment: '',
			streetId: '',
			houseId: '',
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

			this.setState({
				streetId: id,
			});

			if (title === streetValue) onGetNumberHouses(id);
		})
	};

	onSelectHouse = (housesList, onGetHouse, houseValue) => {
		return housesList.map(house => {
			const {title, id} = house;

			this.setState({
				houseId: id
			});

			if (houseValue === title) onGetHouse(id);
		})
	};

	onSubmitForm = (e, state, onSubmit) => {
		e.preventDefault();

		const {
			name, phone,
			street, house, flat, entrance, floor, intercom,
			comment,
			timeOrder, delivery, payment,
			streetId, houseId,
		} = state;

		const localTimeOrder = timeOrder === 'runtime' ? '1' : '0';

		// const formData = new FormData();
		// formData.append('name', name);
		// formData.append('phone', phone);
		// formData.append('street', street);
		// formData.append('house', house);
		// formData.append('flat', flat);
		// formData.append('entrance', entrance);
		// formData.append('floor', floor);
		// formData.append('intercom', intercom);
		// formData.append('comment', comment);
		// formData.append('runtime', localTimeOrder);
		// formData.append('preorder', localTimeOrder);
		// formData.append('preorder_datetime', '');
		// formData.append('no-contact-delivery', '1');
		// formData.append('renting', '');
		// formData.append('preorder_date', '');
		// formData.append('preorder_time', '');
		// formData.append('no_contact_delivery', delivery);
		// formData.append('payment', payment);

		const formData = {
			'name': name,
			'phone': phone,
			'street': street,
			'house': house,
			'flat': flat,
			'entrance': entrance,
			'floor': floor,
			'intercom': intercom,
			'comment': comment,
			'streetId': streetId,
			'houseId': houseId,

			'runtime': localTimeOrder,
			'preorder': localTimeOrder,
			'preorder_datetime': '',
			'no-contact-delivery': '1',
			'renting': '',
			'preorder_date': '',
			'preorder_time': '',
			'no_contact_delivery': delivery,
			'payment': payment,
		};

		return onSubmit(formData);
	};

	render() {
		const {
			name, phone,
			street, house, flat, entrance, floor, intercom,
			comment,
		} = this.state;

		return (
			<div className='addressDelivery'>
				<h2 className='titleDelivery'>Адрес доставки</h2>
				<Consumer>
					{
						({
							 basket,
							 streetsList, housesList,
							 onGetStreets, onGetNumberHouses, onGetHouse, onSubmit
						 }) => {
							return (
								<React.Fragment>
									<form className='addressForm'
												onSubmit={(e) =>
													this.onSubmitForm(e, this.state, onSubmit)}>
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
																			 onBlur={() =>
																				 this.onSelectStreet(
																					 streetsList, onGetNumberHouses, street)}/>
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
															 name='intercom'
															 type="text"
															 value={intercom}
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
										<div className='submit'>
											<input className='btnSubmit'
														 type="submit"
														 value="Отправить"/>
										</div>
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