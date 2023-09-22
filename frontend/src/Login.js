import axios from "axios";
import { useState } from "react";
import Navigation from "./Navigation";
import BASE_URL from "./Settings";

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    async function submit(e) {
        e.preventDefault();
        const user = {
            username: username,
            password: password
        };
        try {
            const { data } = await axios.post(`${BASE_URL}token/`, user, {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
            });

            localStorage.clear();
            localStorage.setItem('access_token', data.access);
            localStorage.setItem('refresh_token', data.refresh);
            axios.defaults.headers.common['Authorization'] = `Bearer ${data['access']}`;
            window.location.href = '/userrecommender';
        } catch (error) {
            console.error("Login error:", error);
            window.location.href = '/login';
        }
    }

    function handleUsernameChange(e) {
        setUsername(e.target.value);
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
                        <h3 className="Auth-form-title">Log In</h3>
                        <div className="form-group mt-3">
                            <label>Username</label>
                            <input className="form-control mt-1"
                                placeholder="Enter Username"
                                name='username'
                                type='text' value={username}
                                required
                                onChange={handleUsernameChange} />
                        </div>
                        <div className="form-group mt-3">
                            <label>Password</label>
                            <input name='password'
                                type="password"
                                className="form-control mt-1"
                                placeholder="Enter password"
                                value={password}
                                required
                                onChange={handlePasswordChange} />
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
    )
};

export default Login;
