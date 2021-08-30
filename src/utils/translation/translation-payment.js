import EnumPayment from "../enums/enum-payment";

const TranslationPayment = {
	title: 'Способ оплаты',
	[EnumPayment.cash]: 'Наличными',
	[EnumPayment.card]: 'Картой',
	[EnumPayment.online]: 'Онлайн',
	[EnumPayment.halva]: 'Халва',
};

export default TranslationPayment;