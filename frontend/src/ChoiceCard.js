import { Col, Container, Row } from 'react-bootstrap';
import { useState } from 'react';

function ChoiceCard(props) {
    const first = props.choice[0];
    const second = props.choice[1];
    const [selectedChoice, setSelectedChoice] = useState(null);
    const [hoveredChoice, setHoveredChoice] = useState(null);
  
    function handleClick(option) {
      setSelectedChoice(option);
      setHoveredChoice(null);
      props.onSelect(option);
    }
  
    function handleMouseEnter(option) {
      setHoveredChoice(option);
    }
  
    function handleMouseLeave() {
      setHoveredChoice(null);
    }

    return (
      <Container>
        <Row className="justify-content-center mb-3">
          <Col md={6} lg={4} className="text-center">
            <button
              type="button"
              className="btn btn btn-block"
              style={{
                backgroundColor:
                  selectedChoice === first
                    ? 'teal'
                    : hoveredChoice === first
                    ? 'teal'
                    : 'lightBlue',
              }}
              onClick={function() { handleClick(first) }}
              onMouseEnter={function() { handleMouseEnter(first) }}
              onMouseLeave={handleMouseLeave}
            >
              {first}
            </button>
          </Col>
          <Col md={6} lg={4} className="text-center">
            <button
              type="button"
              className="btn btn btn-block"
              style={{
                backgroundColor:
                  selectedChoice === second
                    ? 'teal'
                    : hoveredChoice === second
                    ? 'teal'
                    : 'lightBlue',
              }}
              onClick={function() { handleClick(second) }}
              onMouseEnter={function() { handleMouseEnter(second) }}
              onMouseLeave={handleMouseLeave}
            >
              {second}
            </button>
          </Col>
        </Row>
      </Container>
    );
}

export default ChoiceCard;
