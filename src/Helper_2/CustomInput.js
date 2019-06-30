import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
const styles = theme => ({
    input: {
    //   margin: theme.spacing.unit * 2,
    width: '340px',
     marginLeft:5,   
    borderStyle: 'groove',
    borderRadius: 14,
    padding: '5px',
    // color:'black'

},
  });

class CustomInput extends Component {
    constructor(props) {
        super(props);
        this.state = {
          text: props.inputText,
          placeholder: props.placeholder,
          classes:props.classes,
        }
        // console.log(props)
    }
    static getDerivedStateFromProps(props){
        return {
            text: props.inputText,
        }
    }
    render() {
        const { text, placeholder, classes } =  this.state;
        console.log("customeInput>>>>> ", text )
        return (
                <input className={classes.input} onChange={(e) => {this.setState({input:e.target.value})}} value={text} placeholder={placeholder}/>
            );
        }
    }
    

    CustomInput.propTypes = {
        classes: PropTypes.object.isRequired,
      };
    export default withStyles(styles) (CustomInput);