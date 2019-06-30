import React, { Component } from 'react';

import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { invoke } from 'q';
import { totalmem } from 'os';
import { Button, Form, Col, Row, Table, Modal } from 'react-bootstrap';
import swal from 'sweetalert';

import { CustomButton } from './Components/CustomButton';



class AssignmentLogin extends Component {


  constructor() {
    super();
    this.state = {
      email: 'admin@domain.com',
      password: 'admin',
      isUser: false,
      employeeArray: [["Adnan", "Ahmed", "adnan@gmail.com", "10000", "30-Mar-19"], ["Shakil", "Ahmed", "shakil@yopmail.com", "21000", "30-Mar-19"]],
      edit:false,
      show: false   //Modal

    }
    // console.log(this.state.employeeName)
    this.login = this.login.bind(this);
    this.addList = this.addList.bind(this);
    // console.log(this.state.employeeArray)
    //Modal Bind Start
    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
    //Modal Bind End
  }

  //Modal Start
  handleClose() {
    this.setState({ show: false });
  }

  handleShow() {
    this.setState({ show: true });
  }
  //Modal End

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
  modalmodal() {
    return (
      <>
      <Button className="float" variant="primary" onClick={this.handleShow}>
        <i className="fa fa-plus my-float">edit</i>
      </Button>

      <Modal show={this.state.show} onHide={this.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Employee Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>


            <Form.Group as={Row} controlId="formHorizontalText">
              <Form.Label column sm={3}>
                First Name
</Form.Label>
              <Col sm={9}>
                <Form.Control type="text" placeholder="Enter First Name" onChange={(e) => { this.setState({ firstName: e.target.value }) }} />
              </Col>
            </Form.Group>

            <Form.Group as={Row} controlId="formHorizontalText">
              <Form.Label column sm={3}>
                Last Name
</Form.Label>
              <Col sm={9}>
                <Form.Control type="text" placeholder="Enter Last Name" onChange={(e) => { this.setState({ lastName: e.target.value }) }} />
              </Col>
            </Form.Group>

            <Form.Group as={Row} controlId="formHorizontalEmail">
              <Form.Label column sm={3}>
                Email
</Form.Label>
              <Col sm={9}>
                <Form.Control type="email" placeholder="Enter Email" onChange={(e) => { this.setState({ emailEmployee: e.target.value }) }} />
              </Col>
            </Form.Group>

            <Form.Group as={Row} controlId="formHorizontalNumber">
              <Form.Label column sm={3}>
                Salary
</Form.Label>
              <Col sm={9}>
                <Form.Control type="number" placeholder="Enter Salary" onChange={(e) => { this.setState({ salary: e.target.value }) }} />
              </Col>
            </Form.Group>

          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={this.handleClose}>
            Close
     </Button>
          <Button variant="primary" onClick={this.addList.bind(this)}>
            Save Changes
     </Button>
        </Modal.Footer>
      </Modal>
      </>)
    {/* Modal ENd       */ }
  }
 
  renderLogin() {
    const { email, password } = this.state;
    return (

      <div >
        <Form >
          <h1 >Login</h1><br />
          <Form.Group as={Row} controlId="formHorizontalEmail">

            <Form.Label column sm={2}>
              Email
    </Form.Label>
            <Col sm={6}>
              <Form.Control type="email" placeholder="Email" onChange={e => this.setState({ email: e.target.value })} />
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="formHorizontalPassword">
            <Form.Label column sm={2}>
              Password
    </Form.Label>
            <Col sm={6}>
              <Form.Control type="password" placeholder="Password" onChange={e => this.setState({ password: e.target.value })} />
            </Col>
            <br />

          </Form.Group>
          <Form.Group as={Row} controlId="formHorizontalPassword">

            <Col sm={6}>
              <CustomButton className="btn btn-primary" jabClickKaro={this.login} title="Login" />
              {/* <button className="btn btn-primary" onClick={this.login}>Login</button> */}
            </Col>
            <br />
          </Form.Group>
        </Form>;
                    </div>
    )
  }
  //render Login Form End 


  //LOGOUT Start
  logout() {
    swal({
      title: "Are you sure want to Logout?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
      .then((willDelete) => {

        if (willDelete) {
          this.setState({
            isUser: false
          })
          swal("Logout!", {
            icon: "success",
          });
        } else {
          swal("Welcome!");
        }
      });
  }
  //LOGOUT End

  //render
  render() {
    const { isUser } = this.state;

    return ( // called jsx
      <div>
        {!isUser && this.renderLogin()}
        {isUser && this.renderEmployees()}
        {this.modalmodal()}

        {/* <CustomeButton title="app login"/> */}
      </div>
    );
  }
}
//map return new array from the help of array
export default AssignmentLogin;