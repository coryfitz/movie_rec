import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import React, { useState, useEffect } from 'react';
import { refreshToken } from './tokenUtils';

function Navigation() {
    const [isAuth, setIsAuth] = useState(false);

    // extracts the payload from a JWT, decodes it from Base64Url to a JSON object
    function decodeToken(token) {
        try {
            const base64Url = token.split('.')[1];
            const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
            return JSON.parse(window.atob(base64));
        } catch (error) {
            return null;
        }
    }

    useEffect(function effectFunction() {
        const token = localStorage.getItem('access_token');
        if (token !== null) {
            const decodedToken = decodeToken(token);
            const currentTime = Date.now() / 1000;
            if (decodedToken && decodedToken.exp > currentTime) {
                setIsAuth(true);
            } else {
                try {
                    refreshToken()
                        .then(function refreshSuccess() {
                            setIsAuth(true);
                        })
                        .catch(function refreshFail() {
                            localStorage.removeItem('access_token');
                            setIsAuth(false);
                        });
                } catch (error) {
                    console.log("Error refreshing token:", error);
                }
            }
        }
    }, [isAuth]);

    return (
        <div>
            <Navbar bg="dark" variant="dark">
                <Navbar.Brand href="/" style={{ marginLeft: 10 }}>Movie Recommender</Navbar.Brand>
                <Nav className="me-auto"></Nav>
                <Nav>
                    <Nav.Link href="/about" style={{ marginRight: 10 }}>About</Nav.Link>
                </Nav>
                <Nav>
                    {isAuth ? <Nav.Link href="/logout" style={{ marginRight: 10 }}>Logout</Nav.Link> :
                        <Nav.Link href="/login" style={{ marginRight: 10 }}>Login</Nav.Link>}
                </Nav>
                <Nav>
                    {isAuth ? '' :
                        <Nav.Link href="/signup" style={{ marginRight: 10 }}>Signup</Nav.Link>}
                </Nav>
                <Nav>
                    {isAuth ? <Nav.Link href="/userrecommender" style={{ marginRight: 10 }}>Personal Recommender</Nav.Link> : ''}
                </Nav>
            </Navbar>
        </div>
    );
}

export default Navigation;
