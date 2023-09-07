import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import React, { useState, useEffect} from 'react';

function Navigation() {
   const [isAuth, setIsAuth] = useState(false);
   useEffect(() => {
     if (localStorage.getItem('access_token') !== null) {
        setIsAuth(true); 
      }
    }, [isAuth]);
     return ( 
      <div>
        <Navbar bg="dark" variant="dark">
          <Navbar.Brand href="/" style={{marginLeft: 10}}>Movie Recommender</Navbar.Brand>            
          <Nav className="me-auto"> 
          </Nav>
          <Nav>
            <Nav.Link href="/about" style={{marginRight: 10}}>About</Nav.Link>
          </Nav>
          <Nav>
          {isAuth ? <Nav.Link href="/logout" style={{marginRight: 10}}>Logout</Nav.Link> :  
                    <Nav.Link href="/login" style={{marginRight: 10}}>Login</Nav.Link>} 
          </Nav>
          <Nav>
          {isAuth ? '' :  
                    <Nav.Link href="/signup" style={{marginRight: 10}}>Signup</Nav.Link>} 
          </Nav>
          <Nav>
          {isAuth ? <Nav.Link href="/userrecommender" style={{marginRight: 10}}>Personal Recommender</Nav.Link> :  
                    ''}
          </Nav>
        </Navbar>
       </div>
     );
};

export default Navigation