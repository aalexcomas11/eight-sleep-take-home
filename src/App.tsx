import React from 'react';

import SleepSessionStore from './store/SleepSessionStore'
import DashboardHome from './page/DashboardHome';
import './App.css';

function App() {
  return (
    <div className="App">
      <SleepSessionStore>
        <DashboardHome />
      </SleepSessionStore>
    </div>
  );
}

export default App;