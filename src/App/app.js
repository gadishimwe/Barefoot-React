import React, { Component } from 'react';
import './app.scss';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './views/Login';
import NotFound from './views/NotFound';
import HomePage from './views/Homepage';

export default function App() {
  return (
    <div className='main-div'>
      <Router>
        <div>
          <Switch>
            <Route exact path='/' component={HomePage} />
            <Route exact path='/login' component={Login} />
            <Route component={NotFound} />
          </Switch>
        </div>
      </Router>
      React Project
        <h1>SASS TESTING</h1>
    </div>
  );
}

