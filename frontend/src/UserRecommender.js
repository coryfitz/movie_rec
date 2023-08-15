// Import the react JS packages
import {useEffect} from "react";
import Navigation from "./Navigation";
import Recommender from './Recommender';

const UserRecommender = () => {
     useEffect(() => {
        if(localStorage.getItem('access_token') === null){                 
            window.location.href = '/login'
        }
        else{};
     });
     return (
        <div className="App">
         <Navigation />
         <div style={{marginTop: 80}}>
            <h2 style={{marginTop: 20}}>Your personal movie recommender</h2>
            <Recommender recommender_type={'user'}/>
         </div>
        </div>)
}

export default UserRecommender