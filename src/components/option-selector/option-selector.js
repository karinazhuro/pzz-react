import React from "react";

import TranslationTimeOrder from "../../utils/translation-time-order";

import './option-selector.scss';

const OptionSelector = ({option, handleInputChange}) => {
	const {title} = option;

	const transformOption = (option) => {
		const optionList = [];

		for (let key in option) {
			optionList.push(key);
		}

		return optionList;
	}

	const renderDetails = () => {
		let a = transformOption(option)
		console.log(a)

	}

	return (
		<div className='wrapperSelector'>
			<p className='titleSelector'>{title}</p>
			{renderDetails()}
			{/*<label className='labelSelector'>В течение 45 минут*/}
			{/*	<input className='inputSelector'*/}
			{/*				 name="timeOrder"*/}
			{/*				 type='radio'*/}
			{/*				 value={EnumTimeOrder.runtime}*/}
			{/*				 onChange={handleInputChange}/>*/}
			{/*</label>*/}
			{/*<label className='labelSelector'> Предварительный заказ*/}
			{/*	<input className='inputSelector'*/}
			{/*				 name="timeOrder"*/}
			{/*				 type='radio'*/}
			{/*				 value={EnumTimeOrder.preorder}*/}
			{/*				 onChange={handleInputChange}/>*/}
			{/*</label>*/}
		</div>
	)
};

export default OptionSelector;