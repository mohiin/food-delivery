import express from "express";
import cors from "cors";
import { connnectDB } from "./config/db.js";
import foodRouter from "./routes/foodRoute.js";
import userRouter from "./routes/userRoute.js";
// import dotenv from 'dotenv';
import "dotenv/config"
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";
// dotenv.config();


//app config
const app = express();
const port = 4000;


//middlewares
app.use(express.json());
app.use(cors());

//db connection
connnectDB();

//api endpoints
app.use("/api/food", foodRouter);
app.use("/images", express.static("uploads"));
app.use("/api/user", userRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);

app.get("/", (req, res) =>{
    res.send("HI kemon aso");
});

app.listen(port, (req, res) =>{
    console.log(`server is listening on port ${port}`);
});
