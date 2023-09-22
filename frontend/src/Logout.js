import { useEffect } from "react";
import axios from "axios";

function Logout() {

    useEffect(function() {
        async function logoutUser() {
            try {
                axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('access_token')}`;
                await axios.post('http://localhost:8000/logout/', {
                    refresh_token: localStorage.getItem('refresh_token')
                }, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

                localStorage.clear();
                axios.defaults.headers.common['Authorization'] = null;
                window.location.href = '/'
            } catch (e) {
                console.log('logout not working')
            }
        }

        logoutUser();
    }, []);

    return (<div></div>);
}

export default Logout;
