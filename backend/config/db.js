import mongoose from "mongoose";
import dotenv from 'dotenv';
// Load environment variables from the .env file
dotenv.config();

const dbUrl = process.env.ATLASDB_URL;

export const connnectDB  = async()=>{
    await mongoose.connect(dbUrl)
    .then(()=>{
        console.log("DB is connected successfully");
    })
    .catch((err)=>{
        console.log(err);
        console.log("Some error in DB");
    })
}