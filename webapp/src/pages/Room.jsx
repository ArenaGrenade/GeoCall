import { useEffect, useContext, useState } from 'react'
import { useParams } from 'react-router';
import { 
    Container, 
    Row, 
    Col,
    Button,
    ButtonGroup, 
} from 'reactstrap';
import { SessionContext } from '../session';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMicrophone, faVideo, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { joinRoom, leaveRoom } from '../sockets'

import { NavBar } from '../components/NavBar';
import { MediaView } from '../components/MediaView';
import { MessageView } from '../components/MessageView';

const Room = (props) => {
    const { session } = useContext(SessionContext);
    const { code } = useParams();
    const [renderChild, setRenderChild] = useState(false);

    const exitRoom = () => {
        leaveRoom();
        props.history.push('/');
    }

    useEffect(() => {
        if (!session.id) { props.history.push(`/?room=${code}`); }
        setRenderChild(true);
        joinRoom(code, session.id);
    }, [])

    return (
        <>
            <NavBar code={code} />
            <Container fluid className="p-0 no-hor-scroll">
                <Row className="room-row-height">
                    <Col xs='12' md='9' className='p-4'>
                        <ButtonGroup className="mb-3 d-flex justfy-content-center align-content-center btn-grp">
                            <Button color="none" className="btn-light"><FontAwesomeIcon icon={faMicrophone} /></Button>
                            <Button color="none" className="btn-light"><FontAwesomeIcon icon={faVideo} /></Button>
                            <Button color="none" className="btn-danger" onClick={exitRoom}><FontAwesomeIcon icon={faSignOutAlt} /></Button>
                        </ButtonGroup>
                        { renderChild ? <MediaView code={code}/> : null }
                    </Col>
                    <Col xs='0' md='3' className='p-0'>
                        <MessageView code={code}/>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default Room;