import React from 'react';

const PizzaListItem = ({photo, title}) => {
	return (
		<span>
			<img src={photo} alt=""/>
			<h3>{title}</h3>
		</span>
	)
};

export default PizzaListItem;