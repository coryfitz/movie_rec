import { Col, Container, Row, Card } from 'react-bootstrap';
import { useState } from 'react';
import axios from "axios";
import { trackPromise, usePromiseTracker } from 'react-promise-tracker';
import * as Loader from "react-loader-spinner";

function LoadingIndicator () {
  const { promiseInProgress } = usePromiseTracker();
  return (
    promiseInProgress && 
    <div
      style={{
        width: "100%",
        height: "100",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
      }}
    >
      <Loader.ThreeDots color="teal" height="100" width="100" />
    </div>
    );
};

function ChoiceCard({ choice, onSelect }) {
  const first = choice[0];
  const second = choice[1];
  const [selectedChoice, setSelectedChoice] = useState(null);
  const [hoveredChoice, setHoveredChoice] = useState(null);

  const handleClick = (option) => {
    setSelectedChoice(option);
    setHoveredChoice(null);
    onSelect(option);
  };

  const handleMouseEnter = (option) => {
    setHoveredChoice(option);
  };

  const handleMouseLeave = () => {
    setHoveredChoice(null);
  };

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
            onClick={() => handleClick(first)}
            onMouseEnter={() => handleMouseEnter(first)}
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
            onClick={() => handleClick(second)}
            onMouseEnter={() => handleMouseEnter(second)}
            onMouseLeave={handleMouseLeave}
          >
            {second}
          </button>
        </Col>
      </Row>
    </Container>
  );
};
  

    
function Output({output}) {

  let message = null;
  try  {
    message = output['response']
  }
  catch {
    message = "Sorry - you have reached your limit for now. Please try again later."
  }

  let apology = null;
  let success = null;
  try {
    success = output['success']
    if (output['success'] === false) {
      apology = 'Unfortunately we are unable to get a new recommendation at this time; this is one of your previous recommendations. Please try again later.'
    };
  }
  catch {

  }

  return (
    <Container style={{width: '45%', marginTop: 10}}>
        <Row className="justify-content-center">
          <Col className="text-center">
            <h5>{apology}</h5>
            <br/>
            <Card style={{padding: 10}}>
            {message}
            </Card>
          </Col>
        </Row>
    </Container>
  )
};

function Recommender(recommender_type) {

  const [isLoading, setIsLoading] = useState(false);

    const choice1 = ['I prefer relatively serious movies', 'I prefer lighthearted movies'];
    const choice2 = ['I prefer thinking about the future', 'I prefer thinking about the past'];
    const choice3 = ["I'm ok watching movies with subtitles", "I don't like watching movies with subtitles"];
    const choices = [choice1, choice2, choice3];

    const [responses, setResponses] = useState(['', '', '']);
    const [output, setOutput] = useState({'response': 'Your recommendation will go here'});
  
    const handleSelect = (option, index) => {
      const newResponses = [...responses];
      newResponses[index] = option;
      setResponses(newResponses);
    };

  function SubmitButton({responses, apiCall}) {

    const handleSubmit = () => {
      setIsLoading(true);
      apiCall({responses});
    };

    return (
      <div>
        <Container>
          <Row className="justify-content-center">
            <Col className="text-center">
              <button
                type="button" 
                className="btn btn"
                style={{ backgroundColor: isLoading ? 'teal' : 'lightBlue' }}
                onClick={handleSubmit}
              >
                Submit
              </button>
            </Col>
          </Row>
        </Container>
      </div>
    );
  };

  function apiCall({responses}) {

    let config = null

    if (recommender_type.recommender_type === 'user') {
    config = {
      headers: { Authorization: `Bearer ${localStorage.getItem('access_token')}` }
  }};

  const preferences = {'preferences': {responses}};

  trackPromise(
  axios
    .post(`http://localhost:8000/api/${recommender_type.recommender_type}-recommender/`, {preferences}, config)
    .then((data) => {
      setOutput(data.data);
      setIsLoading(false);
  }));
  };

  let title = '';
  if (recommender_type.recommender_type === 'public') {
    title = 'Public Movie Recommender';
  };
  if (recommender_type.recommender_type === 'user') {
    title = 'Your personal movie recommender';
  };

  return (
    <div>
      <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100vw',
      }}>
        <div style={{
            boxShadow: "rgb(0 0 0 / 16%) 0px 0px 3px 1px",
            paddingTop: '30px',
            paddingBottom: '20px',
            borderRadius: '8px',
            backgroundColor: 'white',
        }}>
          <h2 style={{marginBottom: 30}}>{title}</h2>
          {choices.map((choice, i) => { 
              return (
                <ChoiceCard 
                  choice={choice} 
                  key={i} 
                  onSelect={(option) => handleSelect(option, i)}
                />
              )
            })}
            <SubmitButton responses={responses} apiCall={apiCall}/>
          </div>
        </div>
        <LoadingIndicator />
        <div style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              width: '100vw',
              marginTop: '20px',
        }}>
          <Output output={output}/>
        </div>
    </div>
  )
};

export default Recommender;