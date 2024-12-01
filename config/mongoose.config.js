import mongoose from "mongoose";

export const connecttomongoose=async()=>{
    mongoose.connect("mongodb://localhost:27017/chatapp",{
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
    console.log("Connected to MongoDB");
}