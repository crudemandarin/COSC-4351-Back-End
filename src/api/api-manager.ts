import { Observable, map } from "rxjs";
import { ApiService } from "./api-service";

import Reservation from "../data/reservation-data";
import User from "../data/user-data";

class ApiManager {
	public static getReservation(
		reservationId: string
	): Observable<Reservation> {
		const observable: Observable<Reservation> = ApiService.getReservation(
			reservationId
		).pipe(
			map((ret) => {
				const reservationData = ret.data;
				// console.log(reservationData);

				// Reservation does not exist
				if (Object.keys(reservationData).length === 0) return undefined;

				return this.getReservationFromData(reservationData);
			})
		);
		return observable;
	}

	public static deleteReservation(reservationId: string): Observable<any> {
		const observable: Observable<Reservation> =
			ApiService.deleteReservation(reservationId);
		return observable;
	}

	public static getReservations(): Observable<Reservation[]> {
		const observable: Observable<Reservation[]> =
			ApiService.getReservations().pipe(
				map((ret) => ApiManager.getFormattedReservations(ret.data))
			);
		return observable;
	}

	public static createReservation(
		reservation: Reservation
	): Observable<Reservation> {
		const data = {
			id: reservation.id,
			guests: reservation.guests,
			createTime: reservation.createTime,
			startTime: reservation.startTime,
			status: reservation.status,
			user: reservation.user,
		};
		const observable = ApiService.postReservation(data).pipe(
			map(() => reservation)
		);
		return observable;
	}

	public static updateReservation(
		reservation: Reservation
	): Observable<Reservation> {
		const data = {
			id: reservation.id,
			guests: reservation.guests,
			createTime: reservation.createTime,
			startTime: reservation.startTime,
			status: reservation.status,
			user: reservation.user,
		};
		const observable = ApiService.putReservation(data).pipe(
			map(() => reservation)
		);
		return observable;
	}

	private static getFormattedReservations(data: any) {
		const reservationList: Reservation[] = [];
		for (const reservationData of data)
			reservationList.push(
				ApiManager.getReservationFromData(reservationData)
			);
		return reservationList;
	}

	public static getReservationFromData(reservationData: any) {
		const reservation = new Reservation();
		reservation.id = reservationData.id;
		reservation.createTime = reservationData.createTime;
		reservation.guests = reservationData.guests;
		reservation.startTime = reservationData.startTime;
		reservation.status = reservationData.status;
		reservation.user = ApiManager.getUserFromData(reservationData.user);
		return reservation;
	}

	public static getUserFromData(userData: any) {
		const user = new User();

		// Registered user
		if (typeof userData === "string") {
			user.id = userData;
		}

		// Guest user
		else if (typeof userData === "object") {
			user.id = userData.id;
			user.firstName = userData.firstName;
			user.lastName = userData.lastName;
			user.phoneNumber = userData.phoneNumber;
			user.email = userData.email;
			user.memberPoints = userData.memberPoints;
		} else if (userData === undefined) {
			console.log(
				"ApiManager.getFormattedReservations: User is undefined"
			);
		} else {
			console.log(
				"ApiManager.getFormattedReservations: User type not recognized. User = " +
					userData
			);
		}

		return user;
	}
}

export default ApiManager;
