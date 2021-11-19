import { Router } from "express";

import ApiManager from "../api/api-manager";

const router = Router();

/* GET /users */

router.get('/', async (req, res) => {
    console.log('\nGET /users');

    ApiManager.fetchUsers().subscribe({
        next: () => {
            res.status(200).json({ users: ApiManager.getUsers() });
        },
        error: () => {
            res.status(500).json({ message: 'Could not fetch users' });
        }
    });
});

export default router;