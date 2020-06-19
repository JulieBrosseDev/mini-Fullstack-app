import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';


// Password Confirmation is set in the state but not in the db
class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      flash: '',
      name: '',
      lastname: '',
      email: '',
      password: '',
      passwordconf: ''
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
    fetch("/signup",
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
  }

  
// Renders the form with material UI. A flash message returns if the User has signed up successfully or precise a precise error of data
  render() {
    return (
      <div>
      <form onSubmit={this.handleSubmit} style={{display: 'flex', flexDirection: 'column', width: '300px', margin: ' 20px auto', textAlign: 'center'}}>
      <h2>SIGN UP</h2>
      {/* The form takes shows all elements of the state as an input except the flash so a .map is done to transform each element as an input, excluding the flash */}
      {Object.keys(this.state).map((keyName, i) => {
        const flash = this.state.flash
        return (
          keyName === "flash" 
          ? flash != ''
            ? flash === "User has been signed up!"
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
      <Button variant="contained" color="primary" type="submit" value="Submit">
        Submit
      </Button>
      </form>
      </div>
    );
  }
}

export default SignUp;
