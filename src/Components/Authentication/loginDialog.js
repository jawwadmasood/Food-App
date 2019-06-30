import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
// import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
// import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
// import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { update_user } from '../../store/action';
import { connect } from 'react-redux';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';

import { withRouter } from "react-router-dom";
import Loader from '../../Helper/loader';

import firebase from '../../config/firebase';
var db = firebase.database();
var auth = firebase.auth();

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
       authenticated: false, user: null,

      data: {
        email: '',
        password: '',
      },
      fbData: [],
      show: false,
      open: false,


    }
    this.handleClickOpen = this.handleClickOpen.bind(this)
    this.handleClose = this.handleClose.bind(this)
  }
  handleClickOpen() {
    this.setState({ show: true });
    // setOpen(true);
  }
  handleClose() {
    this.setState({ show: false });
  }
  handleSubmit = async event => {
    event.preventDefault();
    const { data } = this.state;
    // try {
    //   await
    this.setState({ loading: true })
    // this.state.loading &&
    // this.props.history.push("/Loader")
    auth.signInWithEmailAndPassword(data.email, data.password)

      .then((success) => {
        this.setState({ loading: false })
        console.log(success)
        var uid = firebase.auth().currentUser.uid;
        localStorage.setItem("uid", JSON.stringify(uid))
        // console.log('email verified',success.user.emailVerified)
        let verifyEmail = success.user.emailVerified;
        console.log('email verified', verifyEmail)
        if (verifyEmail === true) {
          db.ref('users/' + uid + '/account').on('value', (user_data) => {
            var UserData = user_data.val()
            console.log('==>> data ', UserData.name)
            // let array = []
            // for (var key in UserData) {
            //   UserData[key].keyId = key
            //   array.push(UserData[key])
            //   console.log(UserData[key].category)
            // }
            // array.forEach((v) => {
            //   console.log(v.email)
            this.setState({ loading: true })
            if (UserData.category === "user") {
              this.props.history.push("/LocationUser")
            } else {
              this.props.history.push("/LocationRest")
            }

            this.props.store_user(UserData)
            alert('Successfully Login!')
          })
        }
        else {
          alert('Your email is not verified. Check your email for verification.')
        }

      })
      .catch((error) => {
        alert(error)
        this.props.history.push("/")
      })
  }


  handleChange = e =>
    this.setState({
      data: { ...this.state.data, [e.target.id]: e.target.value }
    });
  render() {
    const { show, data, loading } = this.state;
    // if (loading) { return <p>Loading..2</p>; }
    return (
      <div>

        <Button color="inherit" onClick={this.handleClickOpen}>
          Login
      </Button>
        <Dialog open={show} onClose={this.handleClose} aria-labelledby="form-dialog-title">
          <ValidatorForm
            ref="form"
            onSubmit={this.handleSubmit}
            onError={errors => console.log(errors)}
          >
            <DialogTitle id="form-dialog-title">Login</DialogTitle>
            <DialogContent>
              {/* <DialogContentText>
            To subscribe to this website, please enter your email address here. We will send updates
            occasionally.
          </DialogContentText> */}
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
                id="password"
                label="Password"
                onChange={this.handleChange}
                value={data.password}
                type="password"
                validators={['required']}
                errorMessages={['this field is required']}
                fullWidth
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={this.handleClose} color="primary">
                Cancel
                        </Button>
              <Button type="submit" color="primary">
                Login
                       </Button>
                      

            </DialogActions>
          </ValidatorForm>
        {this.state.loading &&
                       <Loader />
        }
        </Dialog>
       
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    store_user: (user) => dispatch(update_user(user))
  }
}

export default connect(null, mapDispatchToProps)(withRouter(Login));
// export default withRouter(Login)
