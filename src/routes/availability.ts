import { Router } from "express";

import ApiManager from "../api/api-manager";

const router = Router();

/* GET /availability ?datetime=&size= */

router.get('/', (req, res) => {

    // requires auth -> 401 Unauthorized
    // requires query params 'datetime' and 'size' -> 400 Bad Request

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

    res.status(503).json( { message: 'Not implemented' } );
});

export default router;