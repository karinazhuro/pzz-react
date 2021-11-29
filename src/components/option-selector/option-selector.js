import './option-selector.scss';

const OptionSelector = ({name, option, translation, handleInputChange}) => {
	const renderOption = () => {
		const keys = Object.keys(option);

		return keys.map(key => {
			return (
				<label key={key}
							 className='labelSelector'>
					<input className='inputSelector'
								 name={name}
								 type='radio'
								 value={key}
								 onChange={handleInputChange}/>
					<span className='selectorContent'>{translation[key]}</span>
				</label>
			)
		});
	};

	return (
		<div className='wrapperSelector'>
			<p className='titleSelector'>{translation.title}</p>
			<div className='selectors'>
				{renderOption()}
			</div>
		</div>
	)
};

export default OptionSelector;