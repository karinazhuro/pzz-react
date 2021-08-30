import EnumDelivery from "../enums/enum-delivery";

const TranslationDelivery = {
	title: 'Доставка',
	[EnumDelivery.courier]: 'Привезите как обычно',
	[EnumDelivery.withoutContact]: 'Доставка без контакта с курьером',
};

export default TranslationDelivery;