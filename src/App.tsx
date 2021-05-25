import React from 'react';
import logo from './logo.svg';
import './App.css';
import Button from '@material-ui/core/Button';
import Home from "./components/Home/Home";
import UserProfile from "./components/UserProfile/UserProfile"

function App() {
  return (
    <div className="App">
    <UserProfile></UserProfile>
    </div>
  );
}

export default App;
