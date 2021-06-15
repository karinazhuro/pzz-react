import './navigation.scss';

const Navigation = () => {
	return (
		<div className='navigation'>
			<a href="#pizzas" className='navigationLinks'>Пиццы</a>
			<a href="#sauces" className='navigationLinks'>Соусы</a>
		</div>
	);
};

export default Navigation;