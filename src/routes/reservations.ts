import { Router } from "express";
import { query, validationResult } from "express-validator";
import ReservationManager from '../reservation-manager';

import ApiManager from "../api/api-manager";

const router = Router();

/* GET /reservations ?userId= */

router.get(
    '/',
    query('userId')
        .isString(),
    (req, res) => {
        console.log('\nGET /reservations');

        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(400).json({ message: 'Must include userId in query params', errors: errors.array() });

        const { userId } = req.query;

        ReservationManager.getReservationsByUserID(userId).subscribe({
            next: reservations => {
                res.status(200).json({
                    message: `Reservations for User ID "${userId}"`,
                    reservations
                });
            },
            error: err => {
                res.status(500).json({ message: 'Could not fetch reservations' });
            }
        });
});

/* GET /reservations/all */

router.get(
    '/all',
    (req, res) => {
        console.log('\nGET /reservations/all');

        ApiManager.getReservations().subscribe({
            next: reservations => {
                res.status(200).json({ reservations });
            },
            error: err => {
                res.status(500).json({ message: 'Could not fetch reservations' });
            }
        });
});

export default router;