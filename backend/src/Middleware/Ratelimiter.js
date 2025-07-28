import ratelimit from "../Config/Upstash.js";
const Ratelimiter = async (req,res,next)=>{
    try{
    const {success} = await ratelimit.limit('Id'); // here there will come authetication
    if(!success){
        res.status(401).json(
            {
            message : "to many request"
            })
    }
    next();
}catch(error){
    console.log(error);
    next(error);
}

}   
export default Ratelimiter;

