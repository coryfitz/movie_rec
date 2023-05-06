const choice1 = ['I prefer serious movies', 'I prefer lighthearted movies'];

const choice2 = ['I prefer thinking about the future', 'I prefer thinking about the past'];

const choice3 = ["I'm ok watching movies with subtitles", "I don't like watching movies with subtitles"];

const choices = [choice1, choice2, choice3];


function ChoiceCard({choice}) {
  const first = choice[0];
  const second = choice[1];
  <div>
    <button type="button" className="btn btn-info">{first}Hi</button>
    <button type="button" className="btn btn-info">{second}</button>
  </div>
}


function App() {
  return (
    <div className="App">
      {choices.map((choice, i) => {
        <ChoiceCard choice={choice} key={i} />
      })}
    </div>
  );
}

export default App;