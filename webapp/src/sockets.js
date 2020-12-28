import io from "socket.io-client"

const ENDPOINT = "http://localhost:5000";
var socket = io(ENDPOINT, { transports: ["websocket"] });

export const joinRoom = (roomID, userID) => {
    socket.emit("join-room", roomID, userID);
}

export const sendMessage = (roomID, message) => {
    console.log("Send Message", roomID, message);
    socket.emit("chat-message", roomID, message);
}

export const getMessages = (callBack) => {
    socket.on("chat-message", message => {
        console.log("Message Recieved ", message);
        return callBack(message);
    });
}

export const addParticipant = (callBack) => {
    socket.on("add-participant", participant => {
        console.log("New Participant in socket ", participant);
        return callBack(participant);
    });
}

export const deleteParticipant = (callBack) => {
    socket.on("delete-participant", participant => {
        console.log("Participant left ", participant);
        return callBack(participant);
    });
}

export const getPeers = (userID, roomID, callBack) => {
    socket.emit("get-peers", userID, roomID, (participants) => {
        return callBack(participants);
    });
}

export const leaveRoom = () => {
    socket.disconnect();
}

// RTC handshake functions
export const callUser = (offerObj) => {
    console.log("Calling user", offerObj);
    socket.emit("call-user", offerObj);
}

export const getCall = (callBack) => {
    socket.on("call-made", offer => {
        console.log("Call recieved");
        return callBack(offer);
    });
}

/*
// RTC connection stuff
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