import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import Login from "./Seller/Login"
import Home from './Seller/Home';

import "@ui5/webcomponents/dist/json-imports/i18n.js"
import { ThemeProvider } from '@ui5/webcomponents-react/lib/ThemeProvider';

function App() {
  return (
    <Router>
      <ThemeProvider>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route path="/Home" component={Home} />
        </Switch>
      </ThemeProvider>
    </Router>
  );
}

export default App;
