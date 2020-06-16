import {MuiThemeProvider} from '@material-ui/core/styles';
import { Grid, Paper } from '@material-ui/core';

import React from 'react';
import './App.css';
import SignUp from './components/SignUp'


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
                            <Grid  item  xs={12}
                            alignContent='center'
                            >
                                    <SignUp  />
                            </Grid>
                        </Grid>
                </Paper>
            </Grid>
    </Grid>
</MuiThemeProvider>
  );
}

export default App;
