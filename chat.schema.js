import mongoose from "mongoose";
const chatSchema =new mongoose.Schema({
    username: String,
    message: String,
    room:String,
    time:Date
});
export const chatModel=new mongoose.model("Chat",chatSchema);