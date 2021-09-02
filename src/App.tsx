import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import SleepSessionStore from './store/SleepSessionStore'
import DashboardHome from './page/DashboardHome';
import UserDashboard from './page/UserDashboard';

import './App.css';

function App() {

  return (
    <div className="App flex min-h-screen">
      <SleepSessionStore>
        <Router>
          <Switch>
            <Route path="/" exact component={DashboardHome} />
            <Route path="/sleepSession/user/:userID" exact component={UserDashboard} />
          </Switch>
        </Router>
      </SleepSessionStore>
    </div>
  );
}

export default App;