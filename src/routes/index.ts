import { Router } from "express";

const router = Router();

/* GET / */

router.get('/', (req, res) => {
    console.log('\nGET /');
    res.status(200).json({ message: 'Hello, World! 👋' })
});

export default router;