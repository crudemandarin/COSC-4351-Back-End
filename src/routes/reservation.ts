import { Router } from "express";
import { body, query, validationResult } from "express-validator";
import ApiManager from "../api/api-manager";
import Reservation from "../data/reservation-data";
import ReservationManager from "../reservation-manager";

import Utils from '../utils';

const router = Router();

/* GET /reservation ?reservationId= */

router.get(
    '/',
    query('reservationId')
        .isString(),
    (req, res) => {
        console.log('\nGET /reservation');

        const { reservationId } = req.query;

        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(400).json({ message: 'Must include reservationId in query params', errors: errors.array() });

        ApiManager.getReservation(reservationId).subscribe({
            next: reservation => {
                console.log('Get Reservation successful', reservation);
                res.status(200).json({ message: `Reservation Fetched`, reservation });
            },
            error: err => {
                console.log('Get Reservation Failed', err);
                res.status(500).json({ message: `Reservation fetch failed` });
            }
        })
    }
)

/* POST /reservation ?datetime=&size= */

router.post(
    '/',
    // Auth Middleware
    query('datetime')
        .isNumeric(),
    query('size')
        .isFloat({ min: Utils.MINIMUM_RESERVATION_SIZE, max: Utils.MAXIMUM_RESERVATION_SIZE }),
    (req, res) => {
        console.log('\nGET /reservation');

        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(400).json({ message: 'Must include datetime and size in query params', errors: errors.array() });

        const { datetime, size } = req.query;

        const staged = new Reservation();
        staged.createTime = Date.now();
        staged.startTime = parseInt(datetime,10);
        staged.guests = parseInt(size,10);
        staged.status = Utils.PENDING;
        staged.id = Utils.generateId();

        ReservationManager.isReservationAvailable(staged).subscribe({
            next: isAvailable => {
                if (isAvailable) {
                    ReservationManager.createReservation(staged).subscribe({
                        next: () => {
                            res.status(200).json({ message: `Pending reservation ${staged.id} created`, reservationId: staged.id });
                        },
                        error: err => {
                            console.log('createReservation failed', err);
                            res.status(500).json({ message: 'Failed to create reservation' });
                        }
                    })
                } else {
                    res.status(406).json({ message: 'Reservation not available' });
                }
            },
            error: err => {
                console.log('reservationIsAvailable failed', err);
                res.status(500).json({ message: 'Failed to create reservation' });
            }
        });
});

/* POST /reservation/book */

router.post(
    '/book',
    // Auth Middleware
    body('reservationId')
        .exists(),
    body('user')
        .exists(),
    (req, res) => {
        console.log('\nGET /reservation/book');

        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(400).json({ message: 'Must include reservationId and user in body', errors: errors.array() });

        const { reservationId, user } = req.body;


        ApiManager.getReservation(reservationId).subscribe({
            next: reservation => {
                if (reservation.status !== Utils.PENDING) {
                    return res.status(400).json({ message: `Reservation ${reservationId} is not pending` });
                }

                if (reservation.isExpired()) {
                    return res.status(408).json({ message: `Reservation ${reservationId} has expired` });
                }

                reservation.status = Utils.CONFIRMED;
                reservation.user = ApiManager.getUserFromData(user);

                console.log('Expected Reservation: ', reservation);

                ApiManager.updateReservation(reservation).subscribe({
                    next: () => {
                        return res.status(200).json({ message: `Reservation ${reservationId} is successfully booked` });
                    },
                    error: err => {
                        return res.status(500).json({ message: `Reservation ${reservationId} failed booked` });
                    }
                });
            },
            error: err => {
                res.status(500).json({ message: `Could not get reservation ${reservationId}` });
            }
        });
    }
);

/* DELETE /reservation ?reservationId= */

router.delete(
    '/',
    query('reservationId')
        .isString(),
        (req, res) => {
            console.log('\nDELETE /reservation');

            const { reservationId } = req.query;

            const errors = validationResult(req);
            if (!errors.isEmpty()) return res.status(400).json({ message: 'Must include reservationId in query params', errors: errors.array() });

            ApiManager.deleteReservation(reservationId).subscribe({
                next: () => {
                    console.log('Delete Reservation successful');
                    res.status(200).json({ message: `Reservation ${reservationId} successfully deleted` });
                },
                error: err => {
                    console.log('Delete Reservation Failed', err);
                    res.status(500).json({ message: `Reservation delete failed` });
                }
            })
        }
)

export default router;