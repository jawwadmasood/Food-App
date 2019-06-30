import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
// import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
// import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
// import { makeStyles } from '@material-ui/core/styles';

import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';

import { withRouter } from "react-router-dom";
import firebase from '../../config/firebase';

var db = firebase.database();
var auth = firebase.auth();

class SignupUser extends Component {
  constructor() {
    super();
    this.state = {
      data: {
        name: '',
        email: '',
        gender: '',
        password: '',
        confirmPass: '',
        age: '',
        country: '',
        city: '',
      },

      errors: {},
      loading: false,

      show: false,
      open: false,
      // login: false,
      //   user: null,
    }
    this.handleClickOpen = this.handleClickOpen.bind(this)
    this.handleClose = this.handleClose.bind(this)
    // this.signupForm = this.signupForm.bind(this)
  }


  // export default function SignupDialog() {
  //   const [open, setOpen] = React.useState(false);


  handleClickOpen() {
    this.setState({ show: true });
    // setOpen(true);
  }

  handleClose() {
    this.setState({ show: false });
  }

  handleSubmit = (e) => {
    // console.log('done')
    e.preventDefault();
    const { data } = this.state;
    // console.log(email)
    // console.log(password)
    this.setState({ loading: true })
    auth.createUserWithEmailAndPassword(data.email, data.password)
      // .then(() => { alert('hogia')})
      .then((success) => {
        // document.getElementById("loaders").style.display = 'none';
        let userObj = {
          name: data.name,
          email: data.email,
          gender: data.gender,
          age: data.age,
          country: data.country,
          city: data.city,
          category: "user",
          createTime: firebase.database.ServerValue.TIMESTAMP,
          uid: success.user.uid
        }
        let userUid = firebase.auth().currentUser.uid
        console.log(userUid)
        localStorage.setItem("Useruid", JSON.stringify(userUid))

        let user= auth.currentUser;
        user.sendEmailVerification()

        db.ref('users/' + userUid + '/account')
          .set(userObj)
          .then(() => { alert('account created! ') })
        this.props.history.push("/LocationUser")
      })
      .catch((error) => {
        console.log(error)
      })

  }


  handleChange = e =>
    this.setState({
      data: { ...this.state.data, [e.target.id]: e.target.value }
    });

  componentDidMount() {
    // custom rule will have name 'isPasswordMatch'
    ValidatorForm.addValidationRule('isPasswordMatch', (value) => {
      if (value !== this.state.data.password) {
        return false;
      }
      return true;
    });
  }

  componentWillUnmount() {
    // remove rule when it is not needed
    ValidatorForm.removeValidationRule('isPasswordMatch');
  }

  render() {
    // const classes = useStyles();
    const { show, data } = this.state;
    // console.log(data)
    // console.log(show)
    // console.log('normal open....===>>', open)
    return (
      <div>

        <Button color="inherit" onClick={this.handleClickOpen}>
          Register User
      </Button>
        <Dialog open={show} onClose={this.handleClose} aria-labelledby="form-dialog-title">
          <ValidatorForm
            ref="form"
            onSubmit={this.handleSubmit}
            onError={errors => console.log(errors)}
          >
            <DialogTitle id="form-dialog-title">Register User</DialogTitle>
            <DialogContent>
              {/* <DialogContentText>
            To subscribe to this website, please enter your email address here. We will send updates
            occasionally.
          </DialogContentText> */}

              <TextValidator
                autoFocus
                margin="dense"
                id="name"
                label="Full Name"
                // onChange={(e) => { this.setState({ fullName: e.target.value }) }}
                onChange={this.handleChange}
                value={data.name}
                type="text"
                validators={['required']}
                errorMessages={['this field is required', 'use only alphabet A to Z']}
                fullWidth
              />

              <TextValidator
                autoFocus
                margin="dense"
                id="email"
                label="Email Address"
                onChange={this.handleChange}
                value={data.email}
                type="email"
                validators={['required', 'isEmail']}
                errorMessages={['this field is required', 'email is not valid']}
                fullWidth
              />

              <TextValidator
                autoFocus
                margin="dense"
                id="gender"
                label="Gender"
                onChange={this.handleChange}
                value={data.gender}
                type="text"
                validators={['required']}
                errorMessages={['this field is required']}
                fullWidth
              />
              <TextValidator
                autoFocus
                margin="dense"
                id="age"
                label="Age"
                onChange={this.handleChange}
                value={data.age}
                type="number"
                validators={['required']}
                errorMessages={['this field is required', 'age should be between 1 to 150']}
                fullWidth
              />
              <TextValidator
                autoFocus
                margin="dense"
                id="country"
                label="Country"
                onChange={this.handleChange}
                value={data.country}
                type="text"
                validators={['required']}
                errorMessages={['this field is required']}
                fullWidth
              />
              <TextValidator
                autoFocus
                margin="dense"
                id="city"
                label="City"
                onChange={this.handleChange}
                value={data.city}
                type="text"
                validators={['required']}
                errorMessages={['this field is required']}
                fullWidth
              />
              <TextValidator
                autoFocus
                margin="dense"
                id="password"
                label="Password"
                onChange={this.handleChange}
                value={data.password}
                type="password"
                validators={['required']}
                errorMessages={['this field is required']}
                fullWidth
              />
              <TextValidator
                autoFocus
                margin="dense"
                id="confirmPass"
                label="Confirm Password"
                onChange={this.handleChange}
                value={data.confirmPass}
                type="password"
                validators={[ 'required']}
                errorMessages={['password mismatch', 'this field is required']}
                fullWidth
              />

            </DialogContent>
            <DialogActions>
              <Button onClick={this.handleClose} color="primary">
                Cancel
          </Button>
              <Button type="submit" color="primary">
                Signup
          </Button>
            </DialogActions>
          </ValidatorForm>
        </Dialog>
      </div>
    );

  }
}

export default withRouter(SignupUser);