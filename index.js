import "./config.js "
import express from "express";
import mongoose from "mongoose";
//import path  from "path";
import cors from "cors";

//import recipesRouter  from("./routers/recipes");
import { handleError } from "./utils/error.js";
import auth  from './middleware/auth.js';
import {router} from "./routes/index.js";
const mongooseString = process.env.DATABASE_URL;


mongoose.connect(mongooseString);
const database = mongoose.connection;

database.on('error', (error)=>{
    console.log(error);
})

database.once('connected', ()=>{
    console.log("Database is connected");
})

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(auth.initialize());
app.use("/api", router)

app.use(handleError);
const port = process.env.PORT || 3000;
app.listen(port, ()=>{
    console.log('Your server is running on http://localhost:'+  port);
})