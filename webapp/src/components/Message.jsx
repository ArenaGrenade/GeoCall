import {
    Card,
    CardBody,
} from 'reactstrap'
import { getName, getColor } from '../utils'

export const Message = ({from, text, timestamp, server}) => {
    const name = getName(from);
    const color = getColor(from);
    const time = new Date(timestamp);
    var hours = ("0" + time.getHours()).substr(-2);
    var minutes = ("0" + time.getMinutes()).substr(-2);

    return (
        <Card className="my-1 w-100 py-1 px-2 message-card" style={{ backgroundColor: "transparent" }}>
            {server ? (
                <CardBody className="w-100 text-center text-muted p-0">
                    { name } { text }
                </CardBody>
            ) : (
                <CardBody className="p-0 d-flex flex-row pr-2">
                    <span className="font-weight-normal text-muted mr-1">{`[${hours}:${minutes}]`}</span>
                    <span className="font-weight-bold mr-1" style={{ color, whiteSpace: 'nowrap' }}>
                        { name.substring(0, 7) }{ name.length > 7 ? "..." : "" }:
                    </span>
                    <span className="message-card-text">
                        { text }
                    </span>
                </CardBody>
            )}
        </Card>
    )
}