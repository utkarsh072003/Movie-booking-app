import express from 'express';
import cors from 'cors';
import 'dotenv/config'
import connectDB from './config/db.js';
import { clerkMiddleware } from '@clerk/express'
import { serve } from "inngest/express";
import { inngest, functions } from "./inngest/index.js"

const app=express();
const port = 5000;



await connectDB();

app.use(express.json());
app.use(cors());
app.use(clerkMiddleware())

app.get('/', (req , res)=>{
    res.send("sender is live")
})
app.use('/api/inngest', serve({ client: inngest, functions }))

app.listen(port, ()=> console.log(`server listening at ${port}`))