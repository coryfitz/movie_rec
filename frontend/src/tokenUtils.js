import axios from 'axios';
import BASE_URL from './Settings';

export async function refreshToken() {
    const refreshTokenValue = localStorage.getItem('refresh_token');
    
    if (!refreshTokenValue) {
        throw new Error("No refresh token found in local storage.");
    }

    try {
        const response = await axios.post(`${BASE_URL}token/refresh/`, {
            refresh: refreshTokenValue
        }, {
            headers: {
                'Content-Type': 'application/json',
            },
            withCredentials: true
        });

        if (response.status === 200) {
            localStorage.setItem('access_token', response.data.access);
            localStorage.setItem('refresh_token', response.data.refresh);
            axios.defaults.headers.common['Authorization'] = `Bearer ${response.data['access']}`;
            return true;
        } else {
            throw new Error("Failed to refresh token.");
        }
    } catch (error) {
        throw error;
    }
}
