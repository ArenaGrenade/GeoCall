import express from 'express';
import http from 'http';
import io from 'socket.io';

const app = express();
const appServer = http.createServer(app);

app.get(
    "/",
    (req, res) => res.send("Sup"),
)

var port = process.env.PORT || 5000;
appServer.listen(port, () => console.log(`Server is up and running at http://localhost:${port}`));

var rooms = {};

var conn = io(appServer);
conn.on('connection', (socket) => {    
    socket.on('join-room', (roomID, userID) => {
        if (!userID || !roomID) return;

        socket.join(roomID);
        if (!(roomID in rooms)) rooms[roomID] = [];

        rooms[roomID] = [...rooms[roomID], { socketID: socket.id, userID }];
        socket.broadcast.emit("chat-message", {from: userID, text: 'joined the room', timestamp: Date.now(), server: true});
        console.log(`New user ${userID} joined the room.`);

        socket.broadcast.emit("add-participant", { socketID: socket.id, userID });
    });

    socket.on('chat-message', (roomID, message) => {
        console.log(`Recieved message-${roomID} ` + JSON.stringify(message, null, 2));
        conn.in(roomID).emit("chat-message", message);
    });

    socket.on("disconnect", () => {
        for (var room in rooms) {
            if(rooms[room].map(u => u.socketID).includes(socket.id)) {
                var userID = rooms[room].filter(u => u.socketID === socket.id)[0].userID;
                socket.leave(room);
                rooms[room] = rooms[room].filter(u => u.socketID !== socket.id);

                socket.to(room).broadcast.emit("chat-message", {
                    from: userID,
                    text: "has left the room",
                    timestamp: Date.now(),
                    server: true
                });

                socket.to(room).broadcast.emit("delete-participant", { socketID: socket.id, userID });
            }
        }
    });

    socket.on("get-peers", (userID, roomID, callBack) => {
        callBack(rooms[roomID] ? rooms[roomID] : []);
    });

    socket.on("call-user", offerObj => {
        console.log(`Call from ${socket.id} to ${offerObj.socketID}`);
        conn.to(offerObj.socketID).emit(offerObj);
    });

    socket.on("make-answer", answer => {
        io.emit("answer-made", answer);
    });
});
