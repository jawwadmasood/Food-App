import React, { Component } from 'react';

import CustomButton from './CustomButton'
import swal from 'sweetalert';
import { Button, Form, Col, Row, Table, Modal } from 'react-bootstrap';
import CustomInput from './CustomInput';

class SignUp extends Component {
    constructor(){
      super();
      this.state={
        email: '',
        password: ''
        // isUser: false,
        // show: false   //Modal
      }
      this.signUp = this.signUp.bind(this);
    }
    
    signUp() {
      const { email, password } = this.state;
      console.log(email, password)
    
      if (email === 'admin@domain.com' && password === "admin") {
    
        swal({
          title: "Successfuly Login!",
          icon: "success",
        });
    
        this.setState({
          isUser: true
        })
    
      }
      else {
        alert("Email or Password is Invalid")
      }
    }
    
      render() {
        const { email, password } = this.state;
        return (
          <div className="App">
            <header className="App-header">
            Email: <CustomInput />
    Password: <CustomInput />
    <CustomButton title='SignUp' onClick={this.signUp} /> <br/>
    <span>Already Registered Login Here!<CustomButton title='Login'/></span>
            </header>
          </div>
        );
      }
    }
    
    export default SignUp;