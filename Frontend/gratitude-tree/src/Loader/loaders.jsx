import axios from "axios";
export async function PromptLoader(){
    try{
    const resquest = await axios.get("http://localhost:3000/prompts");
    return resquest.data;
    }

    catch(error){
        throw new Response("fetched to fail");
    }
}

