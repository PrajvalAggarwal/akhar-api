import { connectToDatabase } from "./db";
import config from "./config/config";
import express from 'express';
import cors from 'cors';
import router from "./routes/routes";

var app=express();


// enable cors
app.use(cors());
// app.options('*', cors());

// body parser
app.use(express.json());

app.use("/v1",router)


//starting the server
app.listen(config.PORT ,async ()=>{
    await connectToDatabase();
    console.log(`server listening ${config.PORT}`)
})