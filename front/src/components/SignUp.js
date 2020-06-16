import React from 'react';

class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      lastname: '',
      email: '',
      password: '',
      passwordconf: '',
      flash: ''

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

  handleSubmit = async event => {
    // alert('Thank you for having suscribed ' + this.state.email + '!' );
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


// afterSubmission(event) {
//   event.preventDefault();
//   let name = this.state.itemName;
//   this.setState ({
//       storedItemName:this.state.itemName
//   }, function() {
//       alert(this.state.storedItemName); // Shows the right value!
//   }
// }

  render() {
    return (
      <div>
      <form onSubmit={this.handleSubmit}>
      {Object.keys(this.state).map((keyName, i) => {
        return (
          keyName === "flash"
          ? <p>flash : {this.state.flash}</p>
          : <div>
            <label for={keyName}>{keyName}</label><br/>
            <input type="text" id={keyName} value={this.state[{keyName}]} onChange={this.updateField} /><br/>
          </div>
        )
      })
      }
        <input type="submit" value="Submit" />
      </form>
      </div>
    );
  }
}

export default SignUp;
