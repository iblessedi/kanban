import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import PrivateRoute from './PrivateRoute'
import Dashboard from '../containers/Dashboard/Dashboard'
import LoginForm from '../containers/Login/LoginForm'

function RouterRules() {
  return (
    <Router>
      <Route exact path="/login" component={LoginForm}/>
      <PrivateRoute exact path="/" component={Dashboard}/>
    </Router>
  );
};

export default RouterRules;
