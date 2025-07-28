import UserModel from '../Model/User.js'
import bcrypt from 'bcrypt'
import { isValidEmail } from '../Functions/isValid.js';
import {client} from '../Config/RedisCache.js'
//add correct status to the values
//hash the passwords
export async function LoginUsingEmail(req, res) {
    try {

        const email = req.body.email.trim();
        const password = req.body.password.trim();
        if(!email || !password){
            return res.status(404).json({
                message : "empty password or email"
            })
        }
        if(!isValidEmail(email)){
         return  res.status(404).json({
                message : "invalid email format"
            })   
        }

        const value = await UserModel.findOne({ email: email });
        if(!value){
            return res.status(404).json({
                message : "Incorrect email."
            })
        }
        const isMatch = await bcrypt.compare(password,value.password);

        if (isMatch) {
            client.set(`${value.id}`,value.name);
            return res.status(200).json({
                message: "successful login",
                id: value.id,
                username : value.name
            })
        } else {
            return res.status(500).json({
                message: "incorrect password"
            });
        }
    } catch (error) {
        console.log(error);
        return res.json({
            message: "error happened",
        })
    }
}

export async function SignUpUsingEmail(req, res) {
    
    try {

        const email = req.body.email.trim();
        const username = req.body.username.trim();
        const password = req.body.password.trim();

        if(!email || !password || !username){
            return res.status(400).json({
                message : "Kindly fill all fields"
            })
        }

        if(!isValidEmail(email)){
         return res.status(400).json({
                message : "Invalid email format."
            })   
        }

        

        const alreadyExist = await UserModel.findOne({ email: email });
        if (alreadyExist) {
          return  res.status(400).json({
                message: "User already exists. Please login."
            })
        }
        const hashedpassword = await bcrypt.hash(password,10);
        const newUser = new UserModel({ email: email, name: username, password: hashedpassword });
        const result = await newUser.save();
        client.set(`${result._id}`,result.name);
        return res.status(200).json({
            message: "successful signup",
            id : result._id,
            username : result.name
        });
    }
    catch (error) {
        console.log(error);

        return res.status(500).json({
            message: "error happened",
        })
    }

}
export async function logout(req,res){
    const userid = req.params.userid;
    try{
        const response = await client.del(`${userid}`);
        if(response == 1){
            res.status(200).json({
                message : "success"
            })
        }
        else{
            res.status(400).json({
                message : "could not delete it"
            })
        }
    }catch(error){
        res.status(500).json({
            message : "server error"
        })
    }
}