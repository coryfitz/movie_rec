import { Col, Container, Row, Card } from 'react-bootstrap';
import { useState } from 'react';

const choice1 = ['I prefer serious movies', 'I prefer lighthearted movies'];
const choice2 = ['I prefer thinking about the future', 'I prefer thinking about the past'];
const choice3 = ["I'm ok watching movies with subtitles", "I don't like watching movies with subtitles"];
const choices = [choice1, choice2, choice3];

function ChoiceCard({choice, onSelect}) {
  const first = choice[0];
  const second = choice[1];
  const [selectedChoice, setSelectedChoice] = useState(null);

  const handleClick = (option) => {
    setSelectedChoice(option);
    onSelect(option);
  };

  return (
    <Container>
      <Row className="justify-content-center mb-3">
        <Col md={6} lg={4} className='text-center'>
          <button 
            type="button" 
            className={'btn btn-info btn-block'} 
            style={{backgroundColor: selectedChoice === first ? 'teal' : 'lightBlue'}}
            onClick={() => handleClick(first)}
          >
            {first}
          </button>
        </Col>
        <Col md={6} lg={4} className='text-center'>
          <button 
            type="button" 
            className={'btn btn-info btn-block'} 
            style={{backgroundColor: selectedChoice === second ? 'teal' : 'lightBlue'}}
            onClick={() => handleClick(second)}
          >
            {second}
          </button>
        </Col>
      </Row>
    </Container>
  );
}

function SubmitButton({responses}) {
  const handleSubmit = () => {
    console.log({responses});
  };

  return (
    <div>
      <Container>
        <Row className="justify-content-center">
          <Col className="text-center">
            <button
              type="button" 
              className={'btn btn-info btn-block'}
              onClick={handleSubmit}
            >
              Submit
            </button>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

function Output() {
  return (
    <Container style={{width: '30%', marginTop: 20}}>
        <Row className="justify-content-center">
          <Col className="text-center">
            <Card >
              Chat GPT output will go here
            </Card>
          </Col>
        </Row>
    </Container>
  )
}

function App() {
  const [responses, setResponses] = useState(['', '', '']);

  const handleSelect = (option, index) => {
    const newResponses = [...responses];
    newResponses[index] = option;
    setResponses(newResponses);
  };

  return (
    <div className="App">
      {choices.map((choice, i) => { 
        return (
          <ChoiceCard 
            choice={choice} 
            key={i} 
            onSelect={(option) => handleSelect(option, i)}
          />
        )
      })}
      <SubmitButton responses={responses} />
      <Output />
    </div>
  );
}

export default App;