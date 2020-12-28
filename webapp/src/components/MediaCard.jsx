import { Card, CardTitle, Col } from 'reactstrap'
import { getName, getColor } from '../utils'

export const MediaCard = ({userID, socketID}) => {
    const name = getName(userID);
    const color = getColor(userID);

    return (
        <Col xl='4' lg='4' sm="6">
            <Card body color="dark" className="d-flex flex-fill justify-content-center align-items-center my-3 p-4">
                <CardTitle tag="h4" className="text-center my-5">{ name }</CardTitle>
            </Card>
        </Col>
    );
}
