import { useState, useEffect, useContext } from 'react'
import { 
    Container,
    Row,
    Col,
    Form,
    FormGroup,
    FormFeedback,
    Button,
    Input,
    Label,
    InputGroup,
} from 'reactstrap'
import { SessionContext } from "../session"
import { getName, getColor } from '../utils'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRedo, faGlobeAsia } from '@fortawesome/free-solid-svg-icons';
import shortid from "shortid";
import qs from "qs";

const Home = (props) => {
    var { session } = useContext(SessionContext);

    const [isRedirect, setIsRedirect] = useState(false);
    const [name, setName] = useState('');
    const [code, setCode] = useState('');
    const [validName, setValidName] = useState(true);
    const [validCode, setValidCode] = useState(true);

    const randomCode = () => setCode(shortid.generate());

    const handleNameChange = (el) => setName(el.target.value);
    const handleCodeChange = (el) => setCode(el.target.value);
    const handleSubmit = (el) => {
        el.preventDefault();

        const isvalidName = validateName(name);
        const isvalidCode = validateCode(code);
        setValidName(isvalidName);
        setValidCode(isvalidCode);

        if (isvalidName) {
            // Generate an user ID
            const userID = `${name.trim()}#${shortid.generate()}$${Math.random() * 360}`;
            session.id = userID;
            session.name = getName(userID);
            session.color = getColor(userID);

            localStorage.setItem("userID", userID);

            if (isvalidCode) props.history.push(`/${code}`);
        }
    };

    const validateName = (name) => name.trim().length > 0 && name.trim().length < 24;
    const validateCode = (code) => /^[a-zA-Z0-9-_ ]+$/.test(code);
    
    useEffect(() => {
        if (session.name) setName(session.name);
        
        const redirectCode = qs.parse(props.location.search)["?room"];
        if (redirectCode) {
            setIsRedirect(true);
            setCode(redirectCode);
        } else {
            randomCode();
        }
    }, [session.name, props.location.search]);

    return (
        <Container fluid>
            <Row className='full-height'>
                <Col xs={{ size: "12", order: 2}} md={{ size: "6", order: 1 }} className='d-flex flex-column justify-content-center align-items-center'>
                    <Form className="d-flex flex-column form-box glow form-padding" onSubmit={handleSubmit}>
                        <FormGroup>
                            <Label for="userName" className="ml-0 mb-0 mt-2 lead">Name</Label>
                            <Input 
                                type="text" 
                                name="userName" 
                                id="userName" 
                                placeholder="RandomName2"
                                autoComplete="off"
                                value={name}
                                invalid={!validName}
                                onChange={handleNameChange}
                            />
                            <FormFeedback>
                                The name needs to be between 0 and 24 characters.
                            </FormFeedback>
                        </FormGroup>
                        <FormGroup>
                            <Label for="roomCode" className="ml-0 mb-0 mt-2 lead">Room Code</Label>
                            <InputGroup>
                                <Input 
                                    type="text" 
                                    name="roomCode" 
                                    id="roomCode" 
                                    placeholder="Room Code"
                                    autoComplete="off"
                                    value={code}
                                    invalid={!validCode}
                                    disabled={isRedirect}
                                    onChange={handleCodeChange}
                                />
                                {!isRedirect? (
                                    <button 
                                        type="button" 
                                        className="regenerate-btn ml-3 btn btn-outline-light"
                                        onClick={randomCode}
                                    ><FontAwesomeIcon icon={faRedo} /></button>
                                ): null}
                                <FormFeedback>
                                    Only URL-safe codes are allowed.
                                </FormFeedback>
                            </InputGroup>
                        </FormGroup>
                        <FormGroup>
                            <Button className="float-right mt-3 btn btn-outline-light">Connect</Button>
                        </FormGroup>
                    </Form>
                </Col>
                <Col xs={{ size: "12", order: 1}} md={{ size: "6", order: 1 }}  className='d-flex flex-column justify-content-center align-items-center'>
                    <div className="text-center title-banner"><FontAwesomeIcon icon={faGlobeAsia} className="mr-4" />GeoCall</div>
                    <div className="text-center desc-banner mt-4">
                        Location-based fully anonymous secure chat, audio and video rooms cuz other apps are just too mainstream.
                    </div>
                </Col>
            </Row>
        </Container>
    );
}

export default Home;