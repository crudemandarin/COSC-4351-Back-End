import ApiManager from "./api/api-manager";
import Reservation from "./data/reservation-data";
import Utils from "./utils";

class ReservationManager {

    // get list of all reservations
    // find all reservations that intersect with datetime
    // check if it's possible to make reservation
        // given an array of table capacities and an array of reservation guest sizes
        // determine tables left over
            // t=[1, 2, 2, 2, 4, 4, 4, 5, 6, 6, 8]
            // r=[3, 2, 4, 4, 2, 5, 6]

            // t=[4, 6, 8]
            // r=[]
        // remove all perfect fits
        // then remove combinatory fits
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

                const intersecting: Reservation[] = [];
                for (const reservation of reservations) if (reservation.isIntersecting(staged)) intersecting.push(reservation);

                const guestList: number[] = [];
                for (const reservation of intersecting) guestList.push(reservation.guests);

                const availableTables = Utils.getAvailableTables(guestList);
            },
            error: (err) => {
                console.log('Failed to fetch reservations. err =', err);
            }
        });
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