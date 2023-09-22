import axios from 'axios';
import { refreshToken } from './tokenUtils';

let refresh = false;

axios.interceptors.response.use(
    function (response) {
        // If the response was successful, just return it.
        return response;
    },
    async function (error) {
        // Log the error object for debugging.
        console.log("Interceptor caught error:", error);

        // Check if the error has a response object.
        if (!error.response) {
            console.log("Error does not have a response object.");
            throw error;
        }

        // Check if the error is from the login endpoint.
        const isLoginAttempt = error.config.url.includes('/token/');
        const isSignupAttempt = error.config.url.includes('/api/register/');

        // Skip retry logic for login and sign-up attempts
        if (isLoginAttempt || isSignupAttempt) {
            throw error;
        }

        if (error.response.status === 401 && !refresh) {
            console.log("Unauthorized error caught. Attempting to refresh token.");
        
            refresh = true;
        
            try {
                await refreshToken();
                console.log("Token refreshed successfully. Retrying the original request.");
                return axios(error.config);
            } catch (refreshError) {
                console.log("Error refreshing token:", refreshError);
                refresh = false;
                throw refreshError;
            }
        }

        // If the error isn't a 401 or we've already tried refreshing, then we'll throw the error.
        console.log("Error wasn't handled by interceptor. Throwing it.");
        throw error;
    }
);