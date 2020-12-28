import { useState, useEffect, useContext } from 'react'
import { 
    Container, 
    Row,
    Input,
    InputGroup,
    Button,
} from 'reactstrap'
import { Message } from './Message'
import { SessionContext } from '../session'
import { getMessages, sendMessage } from '../sockets'
import { getName } from '../utils'

export const MessageView = (props) => {
    const { session } = useContext(SessionContext);
    const [messages, setMessages] = useState([
        {from: "", text: `Welcome ${getName(session.id)}`, timestamp: Date.now(), server: true}
    ]);
    const [inputMessage, setInputMessage] = useState("");

    const makeMessageObj = (message) => { return {from: session.id, text: message, timestamp: Date.now(), server: false} };

    const handleInputMessageChange = (event) => setInputMessage(event.target.value);
    const handleSubmit = (event) => { 
        if (inputMessage.length > 0) { 
            sendMessage(props.code, makeMessageObj(inputMessage)); 
            setInputMessage(""); 
        } 
    };
    const handeEnter = (event) => {
        // Return key is pressed
        if (event.keyCode === 13 && inputMessage.length > 0) {
            sendMessage(props.code, makeMessageObj(inputMessage));
            setInputMessage("");
        }
    }

    useEffect(() => {
        getMessages((socketMessage) => {
            setMessages([...messages, socketMessage]);
        });
    }, [messages]);

    return (
        <Container fluid className="room-row-height d-flex flex-column justify-content-between p-3 pr-5">
            <Row className="h2">Messages</Row>
            <Row className="h-100 scroll d-flex pr-3 flex-column flex-nowrap justify-content-end mb-3">
                {messages.map((message, index) => (
                    <Message key={index} {...message}/>
                ))}
            </Row>
            <Row>
                <InputGroup>
                    <Input type="text" placeholder="Type here..." onKeyUp={handeEnter} onChange={handleInputMessageChange} value={inputMessage}></Input>
                    <Button color="none" type="primary" className="btn btn-outline-light ml-3" onClick={handleSubmit}>Send</Button>
                </InputGroup>
            </Row>
        </Container>
    )
}