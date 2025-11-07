import mongoose from 'mongoose'
import JournalModel from '../Model/Journal.js'
import MoodModel from '../Model/Mood.js'
import { GoogleGenAI ,Type } from '@google/genai'
import dotenv from 'dotenv'

dotenv.config();
export const getTodaysGratitude = async (req, res) => {
    const date = new Date();
    const startDate = new Date(date);
    startDate.setMonth(date.getMonth() - 1)
    const userid = req.params.userid;
    try {
        const mood = await MoodModel.find({
            user: userid, createdAt: {
                $gte: startDate,
                $lte: date
            }},{mood :1 ,rate :1})

        const journal = await JournalModel.find({
            userid: userid, createdAt: {
                $gte: startDate,
                $lte: date
            }
        },{prompt : 1,entry : 1})

        const ai = new GoogleGenAI(process.env.GEMINI_API_KEY);
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: 
`You are a compassionate gratitude coach.

Here is the user's mood data for the past 30 days:
- ${mood} if it is emppty then user is new
...

Here are the user's journal entries for each day:
- ${journal} if it is emppty then user not not entered 
...
Personalized Gratitude & Affirmation Prompt (Emotion-Aware)
You are a caring emotional wellness coach. Use the user's past month of mood entries and journal reflections to generate uplifting, first-person affirmations and gratitude statements that:

Reflect their emotional journey authentically.

Respond to specific moods with empathy.

Promote emotional balance, positivity, and hope.
 Goal:
Generate 5–7 deeply personalized affirmations or gratitude statements (in first person), based on how the user felt and what they went through this month and nothing else. 
make sure to include personal information given in the journal if you can 

 Rules:
Use the mood data to guide the tone:

make sure you just return affirmations and gratiude and no additional message that you do 

If the user felt Sad → add comforting, hopeful, even slightly playful affirmations to gently lift their mood.

If the user felt Stressed/Anxious → generate grounding and reassuring affirmations (e.g., “I am safe even when I’m uncertain”).

If the user felt Angry → use validating, calming statements that promote peace and perspective.

If the user felt Happy/Grateful → reinforce those feelings with celebratory and proud affirmations.

If they felt Empty/Low → help them find meaning and small wins.

Draw directly from journal reflections if available (e.g., “I supported a friend”, “I took a break and felt better”).

Keep each line short, honest, emotional, and motivating.

Keep everything in first person (“I am...”, “I did...”, “I can...”).

New Users (Low or No Data):
If you don't have enough mood or journal data:

Still create 5–7 affirmations.

Assume the user is beginning a healing or growth journey.
Be warm, welcoming, and hopeful (e.g., “I am ready to begin again.”) but personal and amazing.
Never return an empty or vague response.
give them prompts great enough that they dont go anywhere and always come back to this website
Keep the tone calm, positive, and emotionally supportive. Avoid generic advice — make it personal to the data above.
                tip1||tip2||tip3||tip4||tip5 so that i can split it `
        })

        return res.status(200).json({
            message : "successful",
            text : response.text
    });
    } catch (error) {
        return res.status(500).json({
            message: "server side error"
        })
    }
}

