import './navigation.scss';

const Navigation = () => {
	return (
		<div className='navigation'>
			<ul className='navigationWrapper'>
				<li className='wrapperLinks'>
					<a href="#pizzas" className='links'>Пиццы</a>
				</li>
				<li className='wrapperLinks'>
					<a href="#sauces" className='links'>Соусы</a>
				</li>
			</ul>
		</div>
	);
};

export default Navigation;