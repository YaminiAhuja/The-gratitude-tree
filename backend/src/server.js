import express from 'express';
import dotenv from 'dotenv';
import MainPageRouters from './Routes/Main.js'
import connectDB from './Config/ConnectDB.js';
import Ratelimiter from './Middleware/Ratelimiter.js';
import AuthenticationRouter from './Routes/Authentication.js'
import PromptRouter from './Routes/Prompts.js';
import JournalRouter from './Routes/Journal.js';
import GratitudeRouter from './Routes/Gratitude.js';
import MoodRouter from './Routes/Mood.js'
import UsersRouter from './Routes/Users.js'
import { connectRedis } from './Config/RedisCache.js';
import cors from 'cors'

dotenv.config();
const app = express();

//connection to db

//middleware


app.use(express.json());
app.use(cors({ 
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true  
}));

app.options('/{*any}',cors({ 
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true  
}));

app.use(Ratelimiter);
app.use("/",MainPageRouters);
app.use("/auth",AuthenticationRouter);
app.use("/prompts",PromptRouter);
app.use("/journal",JournalRouter);
app.use("/gratitude",GratitudeRouter);
app.use("/mood",MoodRouter);
app.use("/users",UsersRouter);

connectDB(process.env.mongo_username,process.env.mongo_password,process.env.mongo_dbname).then(()=>{
  connectRedis();
}).then(()=>{
app.listen(process.env.PORT,()=>{
    console.log("app is running on port"+process.env.PORT);
})
}).catch((error)=>{
    console.log("error happened");
})
