import express from 'express'
import {LoginUsingEmail,SignUpUsingEmail,logout} from '../Controllers/Authentication.js'
import getUsername from '../Middleware/checkUsername.js';
const router = express.Router();
router.post("/Login/Email",LoginUsingEmail);
router.post("/Signup/Email",SignUpUsingEmail);
router.get("/logout/:userid",getUsername,logout)

export default router;