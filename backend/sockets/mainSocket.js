const { Server } = require('socket.io');
const corsOption = require('../config/corsConfig');

let io;

const setupSocket = (server) => {
    io = new Server(server, {
        path: "/main",
        cors: {origin: "*"},
    });

    const chatNamespace = io.of('/'); // Different endpoint

    chatNamespace.on('connection', (socket) => {
        console.log(`Socket connected: ${socket.id}`);
        chatNamespace.emit("connected")

        // Handle message events
        socket.on('message', (data) => {
            console.log(`Received message: ${data}`);
            chatNamespace.emit('message', data); // Broadcast message to all clients
        });

        // Handle disconnection
        socket.on('disconnect', () => {
            console.log(`Socket disconnected: ${socket.id}`);
        });
    });
    

    return io; // Return the io instance if needed elsewhere
};

const getIO = () => {
    if (!io) {
        console.log("Socket.io not initialized!");
    }
    return io;
};

module.exports = {setupSocket, getIO};
