import {useEffect} from "react";
import axios from "axios";

const Logout = () => {

    useEffect(() => {
        (async () => {
            try {
              axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('access_token')}`;
                const {data} = await axios.post('http://localhost:8000/logout/',{
                    refresh_token:localStorage.getItem('refresh_token')
                } ,{headers: {
                    'Content-Type': 'application/json'
                }});

                localStorage.clear();
                axios.defaults.headers.common['Authorization'] = null;
                window.location.href = '/'
            } catch (e) {
                console.log('logout not working')
            }
        })();
    }, []);

    return (
        <div></div>
    )
}

export default Logout