import Navigation from "./Navigation";
import Recommender from './Recommender';

function Home() {
    return (
      <div className="App">
        <Navigation />
        <div style={{marginTop: 80}}>
          <Recommender recommender_type={'public'}/>
        </div>
      </div>
    );
};

export default Home;