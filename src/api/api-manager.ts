import { Observable } from "rxjs";
import { ApiService } from "./api-service";

import Reservation from "../data/reservation-data";
import User from "../data/user-data";

class ApiManager {

    private static reservations: Reservation[];

    public static fetchReservations(): Observable<any> {
        const observable: Observable<any> = ApiService.getReservations();
        observable.subscribe({
            next: ret => {
                this.loadReservations(ret.data);
            },
            error: err => {
                console.log('ApiManager.getReservations: Error! Could not fetch reservations. err = ', err);
            }
        });
        return observable;
    }

    private static loadReservations(data: any): void {
        console.log('ApiManager.loadReservations: data=', data);
        const reservationList: Reservation[] = [];
        for (const reservationData of data) {
            const reservation = new Reservation();
            reservation.id = reservationData.id;
            reservation.createTime = reservationData.createTime;
            reservation.guests = reservationData.guests;
            reservation.startTime = reservationData.startTime;
            reservation.status = reservationData.status;

            const userData = reservationData.user;
            const user = new User();

            // Registered user
            if (typeof reservationData.user === 'number') {
                user.id = userData;
            }

            // Guest user
            else if(typeof reservationData.user === 'object') {
                user.firstName = userData.firstName;
                user.lastName = userData.lastName;
                user.phoneNumber = userData.phoneNumber;
                user.email = userData.email;
                user.memberPoints = userData.memberPoints;
            }

            else {
                throw new Error('ApiManager.loadReservations: User type not recognized. User = ' + reservationData.user);
            }

            reservation.user = user;

            reservationList.push(reservation);
        }
        this.reservations = reservationList;
    }

    public static getReservations(): Reservation[] { return this.reservations; }

}

export default ApiManager;