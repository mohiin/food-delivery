import mongoose from "mongoose";

export const connnectDB  = async()=>{
    await mongoose.connect("mongodb+srv://patwary10:CRRHvnW7qJ6VGrg6@cluster0.pkksc.mongodb.net/foodDel")
    .then(()=>{
        console.log("DB is connected successfully");
    })
}