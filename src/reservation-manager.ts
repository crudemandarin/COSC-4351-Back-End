import { Observable, map } from "rxjs";
import ApiManager from "./api/api-manager";
import Reservation from "./data/reservation-data";
import Utils from "./utils";

class ReservationManager {
	public static isReservationAvailable(
		staged: Reservation
	): Observable<boolean> {
		const observable = ApiManager.getReservations().pipe(
			map((reservations) => {
				// Build list of intersecting reservations
				const intersecting: Reservation[] = [];
				for (const reservation of reservations)
					if (reservation.isIntersecting(staged))
						intersecting.push(reservation);

				// Build list of guest quantities from each intersecting reservation
				const guestList: number[] = [staged.guests];
				for (const reservation of intersecting)
					guestList.push(reservation.guests);

				console.log("Intersecting Guest List:", guestList);

				return Utils.isTableAvailable(guestList);
			})
		);
		return observable;
	}

	public static createReservation(reservation: Reservation): Observable<any> {
		const observable = ApiManager.createReservation(reservation);
		return observable;
	}

	public static getReservationsByUserID(
		userId: string
	): Observable<Reservation[]> {
		const observable = ApiManager.getReservations().pipe(
			map((reservations) => {
				return reservations.filter(
					(reservation) => reservation.user.id === userId
				);
			})
		);
		return observable;
	}
}

export default ReservationManager;
