import './navigation.scss';

const Navigation = () => {
	return (
		<div className='navigation'>
			<ul className='navigationWrapper'>
				<li className='wrapperLinks'>
					<a href="#pizzas" className='links'>пиццы</a>
				</li>
				<li className='wrapperLinks'>
					<a href="#sauces" className='links'>соусы</a>
				</li>
			</ul>
		</div>
	);
};

export default Navigation;