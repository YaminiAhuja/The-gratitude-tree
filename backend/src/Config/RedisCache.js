import { createClient } from "redis";
import dotenv from 'dotenv'
dotenv.config()


export const client = createClient({
    username: process.env.REDIS_USERNAME,
    password: process.env.REDIS_PASSWORD,
    socket: {
        host: process.env.REDIS_URL,
        port: Number(process.env.REDIS_PORT)
    }
})

client.on("error", (error) => {
    console.log("redis error", error);
})
export async function connectRedis() {
    try {
        await client.connect();
        console.log("redis connected");
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}
