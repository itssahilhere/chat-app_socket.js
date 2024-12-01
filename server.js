import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import { chatModel } from './chat.schema.js';

export const app = express();
app.use(cors());

export const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: '*',
        methods: ["GET", "POST"]
    }
});

io.on("connection", (socket) => {
    console.log("Connection made.");

    socket.on("join", (data) => {
        // Emit a welcome message to the user who joined
        socket.emit("message", { text: `Welcome, ${data.username}!` });
        messageModel.find({room:data.room}).sort({timestamp:1}).limit(50).then(message => {
            socket.emit("previousMessages",message);
        }).catch(err => {
            console.log(err);
        });
        // Broadcast a message to all other users in the same room
        socket.broadcast.to(data.room).emit("message", {
            text: `${data.username} has joined the room.`
        });

        // Join the room
        socket.join(data.room);
    });

    socket.on("sendMessage", (data) => {
        const newChat=new chatModel({username:data.username,message:data.message,room:data.room,time:new Date()});
        newChat.save();
        // Broadcast the received message to all users in the same room
        io.to(data.room).emit("message", {
            username: data.username,
            text: data.message
        });
    });

    socket.on("disconnect", () => {
        console.log("Connection disconnected.");
    });
});


