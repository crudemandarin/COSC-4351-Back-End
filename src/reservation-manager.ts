import { Observable, map } from "rxjs";
import ApiManager from "./api/api-manager";
import Reservation from "./data/reservation-data";
import Utils from "./utils";

class ReservationManager {

    public static bookReservation(reservationId: string, user: any): Observable<any> {
        const observable = ApiManager.getReservation(reservationId);
        observable.subscribe({
            next: reservation => {

                // Validate reservation

                reservation.status = Utils.CONFIRMED;
                reservation.user = ApiManager.getUserFromData(user);

                console.log('Expected Reservation: ', reservation);

                ApiManager.updateReservation(reservation).subscribe({
                    next: () => {
                        console.log('Reservation updated!');
                    },
                    error: err => {
                        console.log('Reservation update failed', err);
                    }
                });
            },
            error: err => {
                console.log('Get Reservation failed', err);
            }
        });
        return observable;
    }

    public static isReservationAvailable(staged: Reservation): Observable<boolean> {
        const observable = ApiManager.getReservations().pipe(
            map((reservations) => {
                // Build list of intersecting reservations
                const intersecting: Reservation[] = [];
                for (const reservation of reservations) if (reservation.isIntersecting(staged)) intersecting.push(reservation);

                // Build list of guest quantities from each intersecting reservation
                const guestList: number[] = [ staged.guests ];
                for (const reservation of intersecting) guestList.push(reservation.guests);

                return Utils.isTableAvailable(guestList);
            })
        );
        return observable;
    }

    public static createReservation(reservation: Reservation): Observable<any> {
        const observable = ApiManager.createReservation(reservation);
        return observable;
    }

    public static getReservationsByUserID(userId: string): Observable<Reservation[]> {
        const observable = ApiManager.getReservations().pipe(
            map(reservations => {
                return reservations.filter(reservation => reservation.user.id === userId);
            })
        );
        return observable;
    }

}

export default ReservationManager;

// init deleteStage: number[]

// reservations <-- get list of all reservations
// for each reservation in reservations
    // if status is pending && creationTime - now > 5 mins
        // append reservationID to deleteStage

// for each reservationID in deleteStage
    // remove from reservations

//

// if table available
    // create reservation w/ status = pending
    // return res1ervation id

// else
    // return UNAVAILABLE