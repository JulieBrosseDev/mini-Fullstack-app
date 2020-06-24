import {MuiThemeProvider} from '@material-ui/core/styles';
import { Grid, Paper } from '@material-ui/core';
import React from 'react';
import ReactDOM from "react-dom";
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import Profile from './components/Profile'
// const bcrypt = require('bcrypt');




function App() {
  return (
<MuiThemeProvider  >
    <Grid  container
    alignItems='center'
    style={{ height:  '100%' }}>
      <Grid  item  xs={12}>
        <Paper
        elevation={4}
        style={{ margin:  32 }}
        >
          <Grid  container
          alignItems='center'
          justify='center'>
              <Grid item  xs={12}
              alignContent='center'
              >
                <Router>
                  <Switch>
                    <Route path='/signup'>
                      <SignUp />
                    </Route> 
                    <Route path='/signin'>
                      <SignIn />
                    </Route>     
                    <Route path='/profile'>
                      <Profile />
                    </Route>                
                  </Switch>
                </Router>
              </Grid>
          </Grid>
        </Paper>
      </Grid>
    </Grid>
</MuiThemeProvider>
  );
}

export default App;
