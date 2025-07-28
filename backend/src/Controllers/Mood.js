import { response } from 'express';
import  MoodModel from '../Model/Mood.js'
import { GoogleGenAI,Type } from '@google/genai';
import dotenv from 'dotenv'

dotenv.config();

export async function getMood(req,res) {
  try {
    const { userId } = req.params;
    const { start, end } = req.query;

    const moods = await MoodModel.find({
      userId,
      createdAt: {
        $gte: new Date(start),
        $lte: new Date(end),
      }
    });

    if (res.headersSent) return; //  

    res.status(200).json({
      message: "success",
      response: moods,
    });

  } catch (err) {
    if (!res.headersSent) {
      res.status(500).json({ message: "internal server error" });
    }
  }
}


export async function addMood(req,res){
    const userId = req.params.userid;
    if(!req.body){
        return res.status(400).json({
            message :"enter all details"
        });
    }
    const mood = req.body.mood;
    const rate = req.body.rate;
    if(!mood || !rate){
        return res.status(400).json({
            message :"enter all details"
        });
    }
    try{
        const newmood = new MoodModel({
            user : userId,
            mood: mood,
            rate : rate,
        })
        const response = await newmood.save();
        res.status(200).json({
            message : "successful mood"
        })

    }catch(error){
        res.status(500).json({
            message : "server side error"
        })
    }
}

export async function getTips(req,res){
   const mood = req.body.mood;
    const rate = req.body.rate;
    if(!mood || !rate){
        return res.json({
            message : "fill all the details"
        })
    }
    try{
    const ai = new GoogleGenAI(process.env.GEMINI_API_KEY);
    const response = await ai.models.generateContent({
        model : "gemini-2.5-flash",
        contents : ` Suggest 5 tips to follow when someone is feeling "${mood}" at intensity level "${rate}".
      If the mood is bad, help them improve it.
      If it's good, help them stay happy. in format 
    tip1||tip2||tip3||tip4||tip5 so that i can split it `,
        config:{
        'response_mime_type': 'application/json',
        'response_schema': {
            type : Type.ARRAY,
            items : {
                type : Type.STRING
            }
        }
    },
    })
    // console.log(response.text);
    const pareseResponse= response.text.split("||")
    res.json({
        message :"successful"
        ,response: pareseResponse.length >0 ? pareseResponse:"prompt not found"
        }
    );
}
    catch(error){
        console.log(error);
        res.json({
            message : "error happened"
        })
    }
}