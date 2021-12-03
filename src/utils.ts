import { v4 } from "uuid";

class Utils {
	/* Constants */

	// Reservation Statuses
	public static PENDING = 0;
	public static CONFIRMED = 1;
	public static EXPIRED = 2;

	// Configuration
	public static MINIMUM_RESERVATION_SIZE = 1;
	public static MAXIMUM_RESERVATION_SIZE = 12;
	public static RESERVATION_LENGTH = 2 * 60 * 60 * 1000; // 2 hrs in ms
	public static EXPIRATION_LENGTH = 11 * 60 * 1000; // 10 mins in ms
	private static RESTAURANT_TABLES = [2, 2, 3, 3, 4, 4, 5, 7, 2, 5, 5, 3, 6];

	/* Functions */

	public static isTableAvailable(
		guestList: number[],
		tableList: number[] = Utils.RESTAURANT_TABLES
	) {
		if (guestList.length > tableList.length) return false;
		const numGuests = guestList.reduce((a, b) => a + b, 0);
		const numSeats = tableList.reduce((a, b) => a + b, 0);
		return numGuests <= numSeats;
	}

	public static generateId(): string {
		return v4();
	}
}

export default Utils;
