import io from "socket.io-client"

const ENDPOINT = "http://localhost:5000";
const socket = io(ENDPOINT, { transports: ["websocket"] });

export const joinRoom = (roomID, userID) => {
    socket.emit("join-room", roomID, userID);
}

export const sendMessage = (roomID, message) => {
    socket.emit("message", roomID, message);
}

export const getMessages = (callBack) => {
    socket.on("message", (message) => {
        console.log(message);
        return callBack(null, message);
    });
}

/*
// RTC connection stuff
const { RTCPeerConnection, RTCSessionDescription } = window;

export const callUser = (offer) => {
    const offer = await peerConnection.createOfffer();
    await peerConnection.setLocalDescription(new RTCSessionDescription(offer));
    socket.emit("call-user", offer);
}

export const getCall = () => {
    socket.on("call-made", async offer => {
        await peerConnection.setRemoteDescription(offer);
    });
    const answer = await peerConnection.createAnswer();
    await peerConnection.setLocalDescription(new RTCSessionDescription(answer));

    socket.emit("make-answer", answer);
}

export const answerCall = () => {
    socket.on("answer-made", async answer => {
        await peerConnection.setRemoteDescription(
            new RTCSessionDescription(answer)
        );
        
        if (!isAlreadyCalling) {
            callUser();
            isAlreadyCalling = true;
        }
    })
}
*/