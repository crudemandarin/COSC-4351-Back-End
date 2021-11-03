import express from 'express';
import cors from 'cors';

const app = express();

app.use(express.json());
app.use(cors());

/* GET / */
app.get('', (req, res) => res.status(200).json( { message: 'Hello, World!' } ));

/* GET /availability ?datetime=&size= */
app.get('availability', (req, res) => {

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

/* GET /availability ?datetime=&size= */


// Default to 404 if Endpoint/Method Not Recognized
app.use((req, res, next) => {
    res.status(404);
    res.json({ error: 'Not found' });
});

export = app;