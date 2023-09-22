import axios from "axios";
import { useState } from "react";
import Navigation from "./Navigation";

function Signup() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    function submit(e) {
        e.preventDefault();

        let user = {
            email: email,
            password: password
        };

        try {
            return axios.post('http://localhost:8000/api/register/', user, {
                headers: { 'Content-Type': 'application/json' }
            })
            .then(function(response) {
                user = {
                    username: email,
                    password: password
                };
                return axios.post('http://localhost:8000/token/', user, {
                    headers: { 'Content-Type': 'application/json' }
                });
            })
            .then(function(loginData) {
                if (!loginData.data.access || !loginData.data.refresh) {
                    throw new Error("Tokens were not provided after login.");
                }

                localStorage.clear();
                localStorage.setItem('access_token', loginData.data.access);
                localStorage.setItem('refresh_token', loginData.data.refresh);
                axios.defaults.headers.common['Authorization'] = `Bearer ${loginData.data['access']}`;
                window.location.href = '/';
            })
            .catch(function(error) {
                console.error("Registration error:", error);
                window.location.href = '/signup';
            });
        } catch (err) {
            console.error(err);
        }
    }

    function handleEmailChange(e) {
        setEmail(e.target.value);
    }

    function handlePasswordChange(e) {
        setPassword(e.target.value);
    }

    return (
        <div>
            <Navigation />
            <div className="Auth-form-container" style={{ marginTop: -100 }}>
                <form className="Auth-form" onSubmit={submit}>
                    <div className="Auth-form-content">
                        <h3 className="Auth-form-title">Sign up for an Account</h3>
                        <div className="form-group mt-3">
                            <label>Email</label>
                            <input className="form-control mt-1" 
                                placeholder="Enter email" 
                                name='email'
                                type='text' 
                                value={email}
                                required 
                                onChange={handleEmailChange}/>
                        </div>
                        <div className="form-group mt-3">
                            <label>Password</label>
                            <input name='password' 
                                type="password" 
                                className="form-control mt-1"
                                placeholder="Enter password"
                                value={password}
                                required
                                onChange={handlePasswordChange}/>
                        </div>
                        <div className="d-grid gap-2 mt-3">
                            <button type="submit" 
                                    className="btn btn"
                                    style={{ backgroundColor: 'lightblue' }}>
                                Submit
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Signup;
