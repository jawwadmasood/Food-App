import React, { Component } from 'react';
import { Form } from 'react-bootstrap';


class LabelInput extends Component {
  constructor(props){
    super(props);
this.state={
    className: props.className,
    title: props.title,
    onClick:props.onClick,
    styleClass: props.style

}

}

    render() {
      const { className, title, styleClass }= this.state;
      return (
        <Form.Label className={className} style={styleClass} >
            {title}
        </Form.Label>
        )
    }
  }
  
  export default LabelInput;