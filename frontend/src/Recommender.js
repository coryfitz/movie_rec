import { Col, Container, Row, Card } from 'react-bootstrap';
import { useState } from 'react';
import axios from "axios";

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
  
  function SubmitButton({responses, apiCall}) {
      const handleSubmit = () => {
        apiCall({responses});
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
    
    function Output({output}) {
    
      return (
        <Container style={{width: '30%', marginTop: 20}}>
            <Row className="justify-content-center">
              <Col className="text-center">
                <Card >
                {output['response']}
                </Card>
              </Col>
            </Row>
        </Container>
      )
    }
    

function Recommender(recommender_type) {


    const choice1 = ['I prefer serious movies', 'I prefer lighthearted movies'];
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
  
    function apiCall({responses}) {

      let config = null

      if (recommender_type.recommender_type == 'user') {
      config = {
        headers: { Authorization: `Bearer ${localStorage.getItem('access_token')}` }
    }};

    const preferences = {'preferences': {responses}};

    axios
      .post(`http://localhost:8000/api/${recommender_type.recommender_type}-recommender/`, {preferences}, config)
      .then((data) => {
        setOutput(data.data)
    });
    };

    return (
      <div>

        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100vw',
            //height: '55vh',
            //border: 'solid'
        }}>
        <div style={{
            //width: '420px',
            boxShadow: "rgb(0 0 0 / 16%) 1px 3px 1px",
            paddingTop: '30px',
            paddingBottom: '20px',
            borderRadius: '8px',
            backgroundColor: 'white',
            //border: 'solid'
        }}>

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

      <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100vw',
            //height: '20vh',
            marginTop: '30px',
            //border: 'solid'
        }}>
      <Output output={output}/>
      </div>

      </div>
    )
}

export default Recommender;