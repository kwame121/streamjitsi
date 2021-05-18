
import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Poc from './components/Poc.jsx';


export default function App()
{

  return(
    <Router>
    <Switch>
        <Route exact path = "/" component={Poc}>
        </Route>
    </Switch>
    </Router>
  )
  
}
