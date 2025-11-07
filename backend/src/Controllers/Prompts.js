import PromptModel from "../Model/Prompt.js";
import { GoogleGenAI ,Type} from "@google/genai";
import dotenv from 'dotenv'

dotenv.config();

export async function getAiPrompt(req,res){

    const entry = req.body?.entry;
    if(!entry || entry == undefined){
       return res.status(400).json({
            message:"no input detected"
        })
    }
    const ai = new GoogleGenAI(process.env.GEMINI_API_KEY);
    try{
    const response  = await ai.models.generateContent({
        model  : "gemini-2.5-flash",
        contents : `
        INTRO: Your task is to understand the user's emotional input and return a single journal prompt.

TASK: You are to return only a journal prompt — no greetings, no comforting messages, no paragraphs, no explanations. Just a one-line open-ended question that helps the user journal and reflect on their feelings.

INPUT: ${entry} — this is the user's emotional state or mood.

GUIDELINES:
- The journal prompt should be emotionally intelligent and help the user reflect and move toward self-awareness, healing, or a positive mindset.
- If the user mentions preferences (like gratitude, peace, or hope), align the prompt accordingly.
- If the input is vague or too short, return a general prompt that is comforting yet reflective.
- If the input expresses suicidal thoughts or severe emotional distress, return a **gentle but reflective** journal prompt (still just a prompt — no advice or comfort).

RULES:
- Do not include greetings, affirmations, or support messages.
- Do not return multiple prompts.
- Do not write explanations.
- Return only a **single journal prompt line**, such as:  
  "What do you think is at the root of how you're feeling today?"  
  or  
  "When did you first start feeling this way?"

OUTPUT: Only the journal prompt like diary entry prompt. Nothing else.
        `,       
    });
    res.status(200).json({
        message :"successful"
        ,response: response.text}
    );
    }catch(error){
        res.status(500).json({
            message : "server error occured."
        })
    }
}


export async function getPrompts(req,res){
    const request = await PromptModel.find({});
    try{
    res.status(200).json(request);
    }catch(error){
         res.status(500).json({
            message : "server error occured.",
             error : error.message,
             error2 : error
        })
    }
}
