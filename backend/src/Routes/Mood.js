import express from 'express'
import { getMood,addMood, getTips } from '../Controllers/Mood.js';
import getUsername from '../Middleware/checkUsername.js';
const router = express.Router()

router.get("/:userid",getUsername,getMood);
router.post("/add/:userid",getUsername,addMood);
router.post("/tips",getTips)

export default router;