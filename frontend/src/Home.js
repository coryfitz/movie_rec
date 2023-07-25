import Navigation from "./Navigation";
import Recommender from './Recommender';

function Home() {
  
    return (
      <div className="App">
        <Navigation />
        <h2 style={{marginTop: 20}}>Public Movie Recommender</h2>
        <Recommender recommender_type={'public'}/>
      </div>
    );
  }

export default Home;