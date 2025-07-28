import express from 'express'
import { getUserProfile,putUserProfile } from '../Controllers/UsersProfile.js';
import getUsername from '../Middleware/checkUsername.js';
const router = express.Router();

router.get("/:userid",getUsername,getUserProfile);
router.put("/:userid",getUsername,putUserProfile);

export default router;