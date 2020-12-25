import { 
    Container,
    Row,
    Col,
    Form,
    FormGroup,
    Button,
    Input,
    Label,
    InputGroup,
    InputGroupAddon,
} from 'reactstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRedo } from '@fortawesome/free-solid-svg-icons'

export const Home = () => {

    return (
        <Container fluid>
            <Row className='landing-row'>
                <Col xs={{ size: "12", order: 2}} md={{ size: "6", order: 1 }} className='d-flex flex-column justify-content-center align-items-center'>
                    <Form className="d-flex flex-column form-box glow form-padding">
                        <FormGroup>
                            <Label for="userName" className="ml-1 mb-2 mt-2 lead">Name</Label>
                            <Input type="text" name="userName" id="userName" placeholder="RandomName2" />
                        </FormGroup>
                        <FormGroup>
                            <Label for="roomCode" className="ml-1 mb-2 mt-2 lead">Room Code</Label>
                            <InputGroup>
                                <Input type="text" name="roomCode" id="roomCode" placeholder="Room Code" className="mr-2"/>
                                <InputGroupAddon>
                                    <button type="button" class="regenerate-btn ml-2 btn btn-outline-light"><FontAwesomeIcon icon={faRedo} /></button>
                                </InputGroupAddon>
                            </InputGroup>
                        </FormGroup>
                        <FormGroup>
                            <Button className="float-right mt-3 btn btn-light">Connect</Button>
                        </FormGroup>
                    </Form>
                </Col>
                <Col xs={{ size: "12", order: 1}} md={{ size: "6", order: 1 }}  className='d-flex flex-column justify-content-center align-items-center'>
                    <div className="text-center title-banner">GeoCall</div>
                    <div className="text-center desc-banner mt-4">
                        Location-based fully anonymous secure chat, audio and video rooms cuz other apps are just too mainstream.
                    </div>
                </Col>
            </Row>
        </Container>
    );
}