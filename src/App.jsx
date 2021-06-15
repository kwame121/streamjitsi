
import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Poc from './components/Poc.jsx';
import PocRebuild from './components/PocRebuilt.jsx';
import Broadcasts from './components/Broadcasts.jsx';
import Destinations from './components/Destinations.jsx'; 

export default function App()
{

  return(
    <Router>
    <Switch>
        <Route exact path = "/" component={PocRebuild}></Route>
        <Route exact path = "/broadcasts" component = {Broadcasts}></Route>
        <Route exact path = "/destinations/add" component = {Destinations}></Route>
        
    </Switch>
    </Router>
  )
  
}
