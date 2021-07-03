import React from 'react';
import logo from './logo.svg';
import './App.css';
import Button from '@material-ui/core/Button';
import Login from "./components/Home/Login";
import Register from "./components/Home/Register"

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Post from "./components/Posts/Posts";
import CreatePost from "./components/Posts/CreatePosts";
import Profile from "./components/UserProfile/Profile";

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
                <li><Link to={'/post'} className="nav-link">Posts</Link></li>
                <li><Link to={'/register'} className="nav-link">Register</Link></li>
                <li><Link to={'/createPost'} className="nav-link">CreatePost</Link></li>
              </ul>
            </nav>
            <hr/>
            <Switch>
              <Route exact path='/' component={Login}/>
              <Route path='/userProfile' component={Profile}/>
              <Route path='/post' component={Post}/>
              <Route path='/register' component={Register}/>
              <Route path='/createPost' component={CreatePost}/>
            </Switch>
          </div>
        </Router>
    );
  }
}

export default App;
