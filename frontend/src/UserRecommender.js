import { useEffect } from "react";
import Navigation from "./Navigation";
import Recommender from './Recommender';

function UserRecommender() {
    useEffect(checkLocalStorageToken);

    function checkLocalStorageToken() {
        if (localStorage.getItem('access_token') === null) {                 
            window.location.href = '/login';
        }
    }

    return (
        <div className="App">
            <Navigation />
            <div style={{ marginTop: 80 }}>
                <Recommender recommender_type={'user'} />
            </div>
        </div>
    );
}

export default UserRecommender;
