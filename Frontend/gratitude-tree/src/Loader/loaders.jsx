import axios from "axios";

export async function PromptLoader(){
  const baseurl = import.meta.env.VITE_LOCALHOST_URL;
    try{
    const resquest = await axios.get(`${baseurl}/prompts`);
    return resquest.data;
    }

    catch(error){
        throw new Response("fetched to fail");
    }
}

