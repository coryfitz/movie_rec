import './App.css';
import React, { Component } from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Home from "./Home";
import About from "./About";
import Login from "./Login";
import Logout from "./Logout";
import Signup from "./Signup";
import UserRecommender from "./UserRecommender";

class App extends Component {
  render() {
    return (
      <div>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/about" element={<About/>} />
            <Route path="/login" element={<Login/>} />
            <Route path="/logout" element={<Logout/>} />
            <Route path="/signup" element={<Signup/>} />
            <Route path="/userrecommender" element={<UserRecommender/>} />
          </Routes>
        </BrowserRouter>  
      </div>
    );
  }
};

export default App;