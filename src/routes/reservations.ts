import { Router } from "express";

import ApiManager from "../api/api-manager";

const router = Router();

/* GET /reservations */

router.get('/', (req, res) => {
    console.log('\nGET /reservations');
    ApiManager.fetchReservations().subscribe({
        next: () => {
            res.status(200).json({ reservations: ApiManager.getReservations() });
        },
        error: () => {
            res.status(500).json({ message: 'Could not fetch reservations' });
        }
    });
});

export default router;