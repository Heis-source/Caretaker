import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import Login from './_jsx/login/login.jsx';

function App() {
  return (
    <Router>
      <div className="container">
      <Switch>
        <Route path="/login" component={Login} />
        <Redirect from="/" to='/login' />
      </Switch>
      </div>
  </Router>
  );
}

export default App;
