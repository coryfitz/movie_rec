import Navigation from "./Navigation";
import Recommender from './Recommender';

function Home() {
  
    return (
      <div className="App">
        <Navigation />
        <h2 style={{marginTop: 20}}>Try the movie recommender here</h2>
        <Recommender recommender_type={'public'}/>
      </div>
    );
  }

export default Home;