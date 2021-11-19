import { Router } from "express";
import { query, validationResult } from "express-validator";

import Utils from '../utils';

const router = Router();

/* GET /reservation ?datetime=&size= */

router.get(
    '/',
    // Auth Middleware
    query('datetime')
        .isNumeric(),
    query('size')
        .isFloat({ min: Utils.MINIMUM_RESERVATION_SIZE, max: Utils.MAXIMUM_RESERVATION_SIZE }),
    (req, res) => {
        console.log('\nGET /reservation');
        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

        const { datetime, size } = req.query;

        console.log(datetime, size);

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
            // return reservation id

        // else
            // return UNAVAILABLE

        // res.status(503).json( { message: 'Not implemented' } );

        const reservationId = '12345';


        // res.status(406).json({ message: 'Reservation not available' });

        res.status(200).json({ message: `Pending reservation ${reservationId} created`, reservationId: '12345' });
});

/* GET /reservation/book ?reservationId= */

router.get(
    '/book',
    // Auth Middleware
    query('reservationId')
        .exists(),
    (req, res) => {
        console.log('\nGET /reservation/book');
        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

        const { reservationId } = req.query;

        console.log(reservationId);

        res.status(200).json({ message: `Reservation ${reservationId} is successfully booked` });
    }
);

export default router;