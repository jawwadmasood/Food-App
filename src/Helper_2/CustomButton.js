import React, { Component } from 'react';
import { Button, Form, Col, Row, Table, Modal } from 'react-bootstrap';


class CustomButton extends Component {
  constructor(props){
    super(props);
  //   if(props.color=="red"){
  //     this.state = {
  //       color : "red"
  //     }
  //   }
  //   else{
  //   this.state = {
  //     color : "blue"
  //   }
  // }
  
this.state={
    className: props.className,
    title: props.title,
    onClick:props.onClick,
    styleClass: props.style

}

}

    render() {
      const { className, title, onClick, styleClass }= this.state;
      return (
        <Button className={className} style={styleClass} onClick={onClick}>
            {title}
        </Button>
        )
    }
  }
  
  export default CustomButton;