import React from 'react';
import Navbar from './components/Navbar';
import Current from './components/CurrentPrice';
import Historical from './components/history/select';
import Result from './components/history/result';
import About from './components/AboutMe';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

function App() {
  return (
    <Router>
      <Navbar/>

      <Switch>

        <Route path='/' exact>
          <Current/>
        </Route>

        <Route path='/current'>
          <Current/>
        </Route>

        <Route path='/history/select'>
          <Historical/>
        </Route>

        <Route path='/history/result'>
          <Result/>
        </Route>

        <Route path='/about'>
          <About/>
        </Route>

      </Switch>

    </Router>
  );
}

export default App;
