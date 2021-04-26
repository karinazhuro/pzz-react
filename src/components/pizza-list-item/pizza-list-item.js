import React from 'react';

const PizzaListItem = ({photo, title, size}) => {
	return (
		<span>
			<img src={photo} alt={title} />
			<h3>{title}</h3>
			<p>{size}</p>
		</span>
	)
};

export default PizzaListItem;