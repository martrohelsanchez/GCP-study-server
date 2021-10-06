import http from "http";
import { Server } from "socket.io";

let io: Server;

export function socketConnect(server: http.Server) {
    io = new Server(server, {
        pingTimeout: 30000,
    });

    io.on("connect", (socket) => {
        socket.on("join room", (roomName) => {
            socket.join(roomName);
        });

        socket.on("leave room", (roomName) => {
            socket.leave(roomName);
        });

        socket.on("startTyping", (convId, username) => {
            socket.to(convId).emit("startTyping", convId, username);
        });

        socket.on("stopTyping", (convId, username) => {
            socket.to(convId).emit("stopTyping", convId, username);
        });

        socket.on("err", (err) => {
            console.error(err);
        });
    });

    return io;
}
