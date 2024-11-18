import mongoose from "mongoose";

export const connectDB = async()=>{

    await mongoose.connect('mongodb+srv://hpshigli:avkdobara@cluster0.z40cksl.mongodb.net/BETA-3').then(()=>console.log("DB connected"));
} 