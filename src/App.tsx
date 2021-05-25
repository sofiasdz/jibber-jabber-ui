import React from 'react';
import logo from './logo.svg';
import './App.css';
import Button from '@material-ui/core/Button';
import Home from "./components/Home/Home";
import UserProfile from "./components/UserProfile/UserProfile"
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

class App extends React.Component  {
  render() {
    return (
        <Router>
          <div>
            <h2>Welcome to Jibber Jabber</h2>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
              <ul className="navbar-nav mr-auto">
                <li><Link to={'/'} className="nav-link"> Home </Link></li>
                <li><Link to={'/userprofile'} className="nav-link">UserProfile</Link></li>
              </ul>
            </nav>
            <hr/>
            <Switch>
              <Route exact path='/' component={Home}/>
              <Route path='/userProfile' component={UserProfile}/>
            </Switch>
          </div>
        </Router>
    );
  }
}

export default App;
