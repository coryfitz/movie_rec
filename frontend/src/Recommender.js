import { Col, Container, Row } from 'react-bootstrap';
import { useState } from 'react';
import axios from "axios";
import { trackPromise } from 'react-promise-tracker';
import LoadingIndicator from './LoadingIndicator';
import ChoiceCard from './ChoiceCard';
import Output from './Output';

function Recommender(recommender_type) {
  const [isLoading, setIsLoading] = useState(false);
  const choice1 = ['I prefer relatively serious movies', 'I prefer lighthearted movies'];
  const choice2 = ['I prefer thinking about the future', 'I prefer thinking about the past'];
  const choice3 = ["I'm ok watching movies with subtitles", "I don't like watching movies with subtitles"];
  const choices = [choice1, choice2, choice3];

  const [responses, setResponses] = useState(['', '', '']);
  const [output, setOutput] = useState({'response': 'Your recommendation will go here'});
  
  function handleSelect(option, index) {
    const newResponses = [...responses];
    newResponses[index] = option;
    setResponses(newResponses);
  };

  function SubmitButton(props) {
    function handleSubmit() {
      setIsLoading(true);
      props.apiCall({responses: props.responses});
    }

    return (
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
    );
  }

  function apiCall(data) {
    let config = null;

    if (recommender_type.recommender_type === 'user') {
      config = {
        headers: { Authorization: `Bearer ${localStorage.getItem('access_token')}` }
      };
    }

    const preferences = {'preferences': data};

    trackPromise(
      axios
        .post(`http://localhost:8000/api/${recommender_type.recommender_type}-recommender/`, preferences, config)
        .then(function (response) {
          setOutput(response.data);
          setIsLoading(false);
        })
        .catch(function(error) {
          if (error.response && error.response.status === 429) {
            setOutput({'response': 'You have made too many requests. Please try again later. You can create an account for to make more requests.'})
          } else {
            console.log('Something went wrong. Please try again.');
          }
        })
    );
  }

  let title = '';
  if (recommender_type.recommender_type === 'public') {
    title = 'Public Movie Recommender';
  } else if (recommender_type.recommender_type === 'user') {
    title = 'Your personal movie recommender';
  }

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
          {choices.map(function(choice, i) {
              return (
                  <ChoiceCard 
                    choice={choice} 
                    key={i} 
                    onSelect={function(option) { handleSelect(option, i) }}
                  />
              );
          })}
          <SubmitButton responses={responses} apiCall={apiCall} />
        </div>
      </div>
      <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100vw',
            marginTop: '20px',
      }}>
        {isLoading ? <LoadingIndicator /> : <Output output={output}/> }
      </div>
    </div>
  );
}

export default Recommender;
