import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';



// Password Confirmation is set in the state but not in the db
class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "julie.dev@gmail.fr",
      name: 'Julie',
      lastname: 'Brosse'
    };

//     this.updateField = this.updateField.bind(this);
//     this.handleSubmit = this.handleSubmit.bind(this);
//   }

//   // Dynamic update accordin to the passed Id
//   updateField(event) {
//     const valueType = event.target.id
//     this.setState({
//     [valueType] : event.target.value})
//   }

//   // Sends the entered data to the post route in backend
//   handleSubmit = async event => { 
//     event.preventDefault();
//     fetch("/profile",
//     { 
//       method:  'POST',
//       headers:  new Headers({
//               'Content-Type':  'application/json'
//       }),
//       body:  JSON.stringify(this.state),
//     })
//     .then(res  =>  res.json())
//     .then(
//       res  =>  this.setState({"flash":  res.flash}),
//       err  =>  this.setState({"flash":  err.flash})
//     )
   }

  
// Renders the form with material UI. A flash message returns if the User has signed up successfully or precise a precise error of data
    render() {
        return (
            <div>
                <h2>Profile</h2>
                {/* The form takes shows all elements of the state as an input except the flash so a .map is done to transform each element as an input, excluding the flash */}
                <List>
                {Object.keys(this.state).map((keyName, i) => {
                    return (
                    <ListItem>
                        <ListItemText primary={keyName} secondary={Object.values(this.state[keyName])}/>
                    </ListItem>
                    )
                })}
                </List>
            </div>
        )
    }
}

export default Profile;
