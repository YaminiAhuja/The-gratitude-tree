import express from 'express'
import { getTodaysGratitude} from '../Controllers/gratitude.js'
import checkUsername from '../Middleware/checkUsername.js'
const router = express.Router();

router.get("/:userid",checkUsername,getTodaysGratitude);

export default router;