import express from 'express'
import{getJournals,postJournal} from '../Controllers/Journal.js'
import getUsername from '../Middleware/checkUsername.js';
const router = express.Router();

router.get("/:userid",getUsername,getJournals);
router.post("/postJournal/:userid",getUsername,postJournal);
export default router;