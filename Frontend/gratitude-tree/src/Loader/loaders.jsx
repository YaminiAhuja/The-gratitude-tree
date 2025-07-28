import axios from "axios";
import dotenv from 'dotenv'
dotenv.config();

export async function PromptLoader(){
    try{
    const resquest = await axios.get(`${process.env.LOCALHOST_URL}prompts`);
    return resquest.data;
    }

    catch(error){
        throw new Response("fetched to fail");
    }
}

