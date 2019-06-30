import React, { Component } from 'react';

import CustomButton from './CustomButton'
import swal from 'sweetalert';
import { Button, Form, Col, Row, Table, Modal } from 'react-bootstrap';
import CustomInput from './CustomInput';

class Login extends Component {
    constructor(){
      super();
      this.state={
        email: 'admin@domain.com',
        password: 'admin',
        // isUser: false,
        // show: false   //Modal
      }
      this.login = this.login.bind(this);
    }
    
    login() {
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
    <CustomButton title='Login' onClick={this.login} /> <br/>
    <span>Not Registered Signup Here!<CustomButton title='Signup'/></span>
            </header>
          </div>
        );
      }
    }
    
    export default Login;