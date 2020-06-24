import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {Link} from 'react-router-dom';



// Password Confirmation is set in the state but not in the db
class SignIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      flash: '',
      email: '',
      password: '',
    };

    this.updateField = this.updateField.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  // Dynamic update accordin to the passed Id
  updateField(event) {
    const valueType = event.target.id
    this.setState({
    [valueType] : event.target.value})
  }

  // Sends the entered data to the post route in backend
  handleSubmit = async event => { 
    event.preventDefault();
    fetch("/signin",
    { 
      method:  'POST',
      headers:  new Headers({
              'Content-Type':  'application/json'
      }),
      body:  JSON.stringify(this.state),
    })
   
    .then(res  =>  res.json())
    .then(
      res  =>  this.setState({"flash":  res.flash}),
      err  =>  this.setState({"flash":  err.flash})
    )
    .then(console.log('step 2'))

  }

  
// Renders the form with material UI. A flash message returns if the User has signed up successfully or precise a precise error of data
  render() {
    return (
      <div style={{textAlign: 'center'}}>
      <form onSubmit={this.handleSubmit} style={{display: 'flex', flexDirection: 'column', width: '300px', margin: ' 20px auto', textAlign: 'center'}}>
      <h2>SIGN IN</h2>
      {/* The form takes shows all elements of the state as an input except the flash so a .map is done to transform each element as an input, excluding the flash */}
      {Object.keys(this.state).map((keyName, i) => {
        const flash = this.state.flash
        return (
          keyName === "flash" 
          ? flash != ''
            ? flash === "You are Signed In"
                ? <p style={{background: 'green', padding: '5px'}}>flash : {flash}</p>
                : <p style={{background: 'red', padding: '5px'}}>flash : {flash}</p>
            : null
          : <TextField
            style={{marginBottom: '30px', border: '1px solid darkGrey', borderRadius: '4px'}}
            id={keyName}
            label={keyName.toUpperCase()}
            placeholder="Placeholder"
            multiline
            variant="filled"
            value={this.state[{keyName}]}
            onChange={this.updateField}
          />
        )
      })
      }
      { console.log(this.state.flash)}
      { this.state.flash === "Welcome"
      ? <Link to='/profile'>
          <Button variant="contained" color="secondary">
            WATCH MY PROFILE >>
          </Button>
        </Link>
      : <Button variant="contained" color="primary" type="submit" value="Submit">
          Submit
        </Button>
      }
      </form>
      <p>Not registered yet ?  <Link to='/signup'>Sign Up</Link></p>
      </div>
    );
  }
}

export default SignIn;
