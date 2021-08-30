import React from "react";

import './option-selector.scss';

const OptionSelector = ({option, translation, handleInputChange}) => {
	const renderOption = () => {
		const keys = Object.keys(option);

		return keys.map(key => {
			return (
				<label className='labelSelector'>{translation[key]}
					<input className='inputSelector'
								 name="timeOrder"
								 type='radio'
								 value={key}
								 onChange={handleInputChange}/>
				</label>
			)
		});
	};

	return (
		<div className='wrapperSelector'>
			<p className='titleSelector'>{translation.title}</p>
			{renderOption()}
		</div>
	)
};

export default OptionSelector;