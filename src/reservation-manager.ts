import { Observable } from "rxjs";
import ApiManager from "./api/api-manager";
import Reservation from "./data/reservation-data";
import Utils from "./utils";

class ReservationManager {

    private static reservations: Reservation[] = [];

    // get list of all reservations
    // find all reservations that intersect with datetime
    // check if it's possible to make reservation

    // if possible -> create reservation, return id
    // else -> throw error

    public static createReservation(datetime: number, guests: number) {
        const staged = new Reservation();
        staged.createTime = Date.now();
        staged.startTime = datetime;
        staged.guests = guests;
        staged.status = Utils.PENDING;

        ApiManager.fetchReservations().subscribe({
            next: () => {
                const reservations = ApiManager.getReservations();

                // Build list of intersecting reservations
                const intersecting: Reservation[] = [];
                for (const reservation of reservations) if (reservation.isIntersecting(staged)) intersecting.push(reservation);

                // Build list of guest quantities from each intersecting reservation
                const guestList: number[] = [ staged.guests ];
                for (const reservation of intersecting) guestList.push(reservation.guests);

                const isAvailable = Utils.isTableAvailable(guestList);
            },
            error: (err) => {
                console.log('Failed to fetch reservations. err =', err);
                throw new Error('Failed to fetch reservations. err = ' + err);
            }
        });
    }

    public static getReservationsByUserID(userId: string): Observable<Reservation[]> {
        const observable = ApiManager.fetchReservations();
        observable.subscribe({
            next: () => {
                ReservationManager.reservations = ApiManager.getReservations()
                                                            .filter(reservation => reservation.user.id === userId);
            },
            error: (err) => {
                console.log('Failed to fetch reservations. err =', err);
                throw err;
            }
        });
        return observable;
    }

    public static getReservations() { return ReservationManager.reservations; }

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