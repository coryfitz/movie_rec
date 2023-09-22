import { Col, Container, Row, Card } from 'react-bootstrap';

function Output(props) {
    let message = null;
    try {
        message = props.output['response'];
    } catch (error) {
        message = "Sorry, the system is encountering some problems right now. Please try again later.";
    }

    let apology = null;
    try {
        if (props.output['success'] === false) {
            apology = 'Unfortunately we are unable to get a new recommendation at this time; this is one of your previous recommendations. Please try again later.';
        }
    } catch (error) {}

    return (
        <Container style={{ width: '45%', marginTop: 10 }}>
            <Row className="justify-content-center">
                <Col className="text-center">
                    <h5>{apology}</h5>
                    <br />
                    <Card style={{ padding: 10 }}>
                        {message}
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}

export default Output;