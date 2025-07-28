import mangoose, { Model, Schema } from 'mongoose'


const schema = new Schema({
    prompt : {
        type : String,
        required : true
    },
    type : {
        type : String,
        required : true
    }
    ,type : {
        type : String,
        required : true
    }
})

const PromptModel = mangoose.model("Prompts",schema);
export default PromptModel;