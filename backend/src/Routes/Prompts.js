import { getPrompts,getAiPrompt } from "../Controllers/Prompts.js";
import express from 'express'

const router = express.Router();
router.get("/",getPrompts);
router.post("/aiprompt",getAiPrompt);

export default router;