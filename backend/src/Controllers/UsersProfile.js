import UserModel from "../Model/User.js";
import mongoose from "mongoose";
export const getUserProfile = async (req,res)=>{
    const userid = req.params.userid;
    
    if (!mongoose.Types.ObjectId.isValid(userid)) {
        return res.status(400).json({
            message: "Invalid user ID format"
        });
    }

    try{
    const response = await UserModel.find({_id:userid});
    if(response.length === 0){
        return res.status(404).json({
            message : "user not found"
        })
    }
    return res.status(200).json({
        message : "success",
        response : {
            name : response[0].name,
            email : response[0].email
        }
    })
    }
    catch(error){
        return res.status(500).json({
            message: "error happened"
        })
    }
}
export const  putUserProfile = async (req,res)=>{
    const userid = req.params.userid;
    const username = req.body.username;
    if(!userid || !username){
        return res.status(400).json({
            message : "incomplete userid or username"
        })
    }
    if (!mongoose.Types.ObjectId.isValid(userid)) {
        return res.status(400).json({
            message: "Invalid user ID format"
        });
    }

    try{
    const response = await UserModel.findOneAndUpdate({_id : userid} , {name : username});
    if(!response){
        return res.status(404).json({
                message: "User not found"
        });
    }
    return res.status(200).json({
        message : "success"
    })
    }catch(error){
        return res.status(500).json({
            message : "error happened at server,try again"
        })
    }
}