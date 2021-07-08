import React, {Component} from 'react';
import './App.css';
import Login from "./components/Home/Login";
import Register from "./components/Home/Register"
import {BrowserRouter as Router, Switch, Route, Link, RouteComponentProps} from "react-router-dom";
import CreatePost from "./components/Posts/CreatePosts";
import Profile from "./components/UserProfile/Profile";
import SearchUsers from "./components/SearchUsers/SearchUsers";
import ViewProfile from "./components/SearchUsers/ViewProfile";
import UserChat from "./components/Chat/UserChat";
import NavbarJJ from "./components/Navbar/Navbar";
import Breadcrumbs from '@material-ui/core/Breadcrumbs';


class App extends Component  {


  render() {

    return (
        <Router>
          <NavbarJJ  ></NavbarJJ>
          <div>
            <h2>Welcome to Jibber Jabber</h2>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
              <ul className="navbar-nav mr-auto">
                <Breadcrumbs aria-label="breadcrumb">
                  <Link to={'/createPost'}  color="textPrimary"> Your Timeline</Link>
                  <Link to={'/searchUsers'} color="textPrimary" >Search for friends</Link>
                </Breadcrumbs>
              </ul>
            </nav>
            <hr/>
            <Switch>
              <Route exact path='/' component={Login}/>
              <Route path='/userProfile' component={Profile}/>
              <Route path='/register' component={Register}/>
              <Route path='/createPost' component={CreatePost}/>
              <Route path='/searchUsers' component={SearchUsers}/>
              <Route path='/viewProfile/:id' component={ViewProfile}/>
              <Route path='/dm/:id' component={UserChat}/>
            </Switch>
          </div>
        </Router>
    );
  }
}

export default App;
