const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const port = 3000;

// Create HTTP server
const server = http.createServer(app);

// Setup Socket.io
const io = new Server(server, {
    cors: {
        origin: "*"
    }
});

// Middleware
app.use(cors());
app.use(express.json({ limit: "40kb" }));
app.use(express.urlencoded({ limit: "40kb", extended: true }))

// Route
app.get("/", (req, res) => {
    res.send("Welcome to backend");
});

// MongoDB Connection
mongoose.connect("mongodb://127.0.0.1:27017/testDB")
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.log(err));

// Socket.io connection
io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    socket.on("disconnect", () => {
        console.log("User disconnected:", socket.id);
    });
});

// Start server
server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});