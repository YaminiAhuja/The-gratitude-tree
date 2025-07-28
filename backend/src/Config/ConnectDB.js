import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connectDB = async(username,password,dbName)=>{
    const url = process.env.mongo_url.replace('<db_username>',username).replace('<db_password>',password).replace('<db_name>',dbName);
    try{
        await mongoose.connect(url,{
            serverSelectionTimeoutMS : 5000,
        });
        console.log("connected");
    }
    catch(error){
        console.log("error happened!\berror = "+error);
        console.log(error.message);
        process.exit(1);
    }
}

export default connectDB;
