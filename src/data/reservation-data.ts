import Holidays from "date-holidays";
import Utils from "../utils";
import { CreditCard } from "./creditcard-data";
import User from "./user-data";

class Reservation {
	public id: string = "";
	public createTime: number = -1;
	public guests: number = -1;
	public startTime: number = -1;
	public status: number = -1;
	public user?: User;
	public creditCard?: CreditCard;

	/* tslint:disable:no-empty */
	constructor() {}

	isIntersecting(other: Reservation): boolean {
		const aLeft = this.startTime;
		const aRight = this.startTime + Utils.RESERVATION_LENGTH;
		const bLeft = other.startTime;
		const bRight = other.startTime + Utils.RESERVATION_LENGTH;
		return aLeft < bRight && aRight > bLeft;
	}

	isExpired(): boolean {
		const now = Date.now();
		const expireTime = this.createTime + Utils.EXPIRATION_LENGTH;
		return expireTime < now;
	}

	isHoliday(): boolean {
		const hd = new Holidays("US");
		return !!hd.isHoliday(new Date(this.startTime));
	}
}

export default Reservation;
