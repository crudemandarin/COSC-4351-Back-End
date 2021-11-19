import { Router } from "express";
import { query, validationResult } from "express-validator";

import Utils from '../utils';

const router = Router();

/* GET /reservation ?datetime=&size= */

router.get(
    '/',
    query('datetime').isNumeric(),
    query('size', `"size" must be in range { min=${Utils.MINIMUM_RESERVATION_SIZE}, max=${Utils.MAXIMUM_RESERVATION_SIZE} }`)
        .isFloat({ min: Utils.MINIMUM_RESERVATION_SIZE, max: Utils.MAXIMUM_RESERVATION_SIZE }),
    (req, res) => {
        // requires auth -> 401 Unauthorized
        // requires query params 'datetime' and 'size' -> 400 Bad Request

        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

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

        // Temporary Dummy Data
        res.status(200).json( { message: 'Reservation available, pending reservation created.', reservationId: '12345' } )
});

export default router;