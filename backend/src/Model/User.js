import { timeStamp } from "console";
import mongoose from "mongoose";
import { type } from "os";

//protect password
const Schema = new mongoose.Schema({
    name : {
        type:String,
        required : true
    },
    email : {
        type:String,
        required : true 
    },
    password : {
        type:String,
        required : true
    }
},{timestamps :true} )

const UserModel = mongoose.model("Users",Schema);

export default UserModel;