import axios from "axios";
import { from, Observable } from "rxjs";
import Reservation from "../data/reservation-data";

export class ApiService {
	private static SERVICE_URL = "http://localhost:4000/";

	public static getReservations(): Observable<any> {
		return from(axios.get(this.SERVICE_URL + "reservations"));
	}

	public static getReservation(reservationId: string): Observable<any> {
		return from(
			axios.get(this.SERVICE_URL + `reservations/${reservationId}`)
		);
	}

	public static postReservation(data: any): Observable<any> {
		return from(axios.post(this.SERVICE_URL + "reservations", data));
	}

	public static putReservation(data: any): Observable<any> {
		return from(
			axios.put(this.SERVICE_URL + `reservations/${data.id}`, data)
		);
	}

	public static deleteReservation(reservationId: string): Observable<any> {
		return from(
			axios.delete(this.SERVICE_URL + `reservations/${reservationId}`)
		);
	}
}
