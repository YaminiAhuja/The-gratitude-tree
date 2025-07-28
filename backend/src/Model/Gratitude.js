import mongoose, { Schema } from "mongoose";
const schema = new Schema({
    prompt : {
        type : String,
        required : true
    },
    userid : {
        type : String,
        required : true
    },
    entry :{
        type : String,
        required : true
    }
},{timestamps : true});

const model = mongoose.model("gratitude",schema)
export default model