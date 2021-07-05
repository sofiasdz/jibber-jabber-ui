import React from 'react';
import './App.css';
import Login from "./components/Home/Login";
import Register from "./components/Home/Register"
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import CreatePost from "./components/Posts/CreatePosts";
import Profile from "./components/UserProfile/Profile";
import SearchUsers from "./components/SearchUsers/SearchUsers";

class App extends React.Component  {
  render() {
    return (
        <Router>
          <div>
            <h2>Welcome to Jibber Jabber</h2>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
              <ul className="navbar-nav mr-auto">
                <li><Link to={'/'} className="nav-link"> Login </Link></li>
                <li><Link to={'/userprofile'} className="nav-link">UserProfile</Link></li>
                <li><Link to={'/register'} className="nav-link">Register</Link></li>
                <li><Link to={'/createPost'} className="nav-link">Timeline</Link></li>
                <li><Link to={'/searchUsers'} className="nav-link">Explore</Link></li>
              </ul>
            </nav>
            <hr/>
            <Switch>
              <Route exact path='/' component={Login}/>
              <Route path='/userProfile' component={Profile}/>
              <Route path='/register' component={Register}/>
              <Route path='/createPost' component={CreatePost}/>
              <Route path='/searchUsers' component={SearchUsers}/>
            </Switch>
          </div>
        </Router>
    );
  }
}

export default App;
