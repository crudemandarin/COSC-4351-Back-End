interface ExpirationDate {
	month: string;
	year: string;
}

class CreditCard {
	public number: string = "";
	public name: string = "";
	public expirationDate: ExpirationDate;
	public cvc: string = "";
}

export { CreditCard, ExpirationDate };
