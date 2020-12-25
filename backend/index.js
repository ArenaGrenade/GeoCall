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
    console.log("A user connected");
    
    socket.on('join-room', (roomID, userID) => {
        socket.join(roomID);

        if (!(roomID in rooms)) rooms[roomID] = [];
        rooms[roomID] = [...rooms[roomID], userID];

        conn.in(roomID).emit("message", 'New user joined the room');
        console.log("New user joined the room the rooms is now" + JSON.stringify(rooms, null, 2));
    });

    socket.on('message', (roomID, message) => {
        console.log("Recieved message: " + message);
        conn.in(roomID).emit("message", message);
    });

    socket.on("call-user", offer => {
        io.emit("call-made", offer);
    })

    socket.on("make-answer", answer => {
        io.emit("answer-made", answer);
    });
});
