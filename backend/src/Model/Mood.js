import mongoose, { Model, Schema } from 'mongoose'

const schema = new Schema({
    user :{
        type :String,
        required : true
    },
    mood : {
        type :String,
        required : true
    },
    rate : {
        type : Number,
        required : true
    }

},{timestamps : true});

const model = mongoose.model("mood",schema)
export default model;