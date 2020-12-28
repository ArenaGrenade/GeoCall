import { useState, useEffect, useContext } from 'react'
import { Container, Row } from 'reactstrap'
import { SessionContext } from '../session'
import { callUser, getPeers, addParticipant, deleteParticipant, getCall } from '../sockets'
import { MediaCard } from './MediaCard';

export const MediaView = (props) => {
    // RTC connection stuff
    const { RTCPeerConnection, RTCSessionDescription } = window;
    const { session } = useContext(SessionContext);
    const [people, setPeople] = useState([]);
    // eslint-disable-next-line
    const [peerConnection, setPeerConnection] = useState(null);

    useEffect(() => {
        addParticipant((participant) => {
            setPeople([...people, participant]);
        });
        
        deleteParticipant((participant) => {
            setPeople(people.filter(u => u.userID !== participant.userID));
        });

        /*getCall(async (offer) => {
            console.log("Offer recieved ", offer);
            await peerConnection.setRemoteDescription(offer);

            const answer = await peerConnection.createAnswer();
            await peerConnection.setLocalDescription(new RTCSessionDescription(answer));

            console.log("Accepting the call answer ", answer);
        });*/
    // eslint-disable-next-line
    }, [people]);

    useEffect(() => {
        // Create a peer connection for this use
        const initPeerConnection = new RTCPeerConnection();
        setPeerConnection(initPeerConnection);

        getPeers(session.id, props.code, participants => {
            setPeople(participants);

            participants.filter(u => u.userID !== session.id).forEach(async (participant) => {
                const offer = await initPeerConnection.createOffer();
                await initPeerConnection.setLocalDescription(new RTCSessionDescription(offer));
                const payload = { socketID: participant.socketID, offer };
                callUser(payload);
            });
        });
    // eslint-disable-next-line
    }, []);

    return (
        <Container fluid>
            <Row>
                {people.map((person, index) => <MediaCard key={index} {...person} />)}
            </Row>
        </Container>
    );
}
