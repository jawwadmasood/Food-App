import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

import { withRouter } from "react-router-dom";
import firebase from '../../config/firebase';

var auth = firebase.auth();

const styles = theme => ({

  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },

  paper: {
    position: 'absolute',
    width: 'max-content',
  },

});

class NavBar_Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
    };
  }
  handleClick = () => {
    this.setState(state => ({
      open: !state.open,
    }));
  };

  handleClickAway = () => {
    this.setState({
      open: false,
      anchorEl: null,
    });
  };


  logOut = event => {
    // const { currentTarget } = event;
    // this.setState(state => ({
    //   anchorEl: state.anchorEl ? null : currentTarget,
    // }));
    auth.signOut()
    .then(() => {
        localStorage.setItem("uid", JSON.stringify({ user: "null" }))
        alert('Logout')
        
    })
    .then(()=>{
      this.props.history.push("/")
    })
  };


  render() {
    // Styling
    const { classes } = this.props;
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);
    const id = open ? 'no-transition-popper' : null;
   
    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar style={{ background: '#D70F64' }}>
            <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
              <MenuIcon />
              
            </IconButton>
          
            <Typography variant="h6" color="inherit" className={classes.grow}>
              Food Delivery App
          </Typography>
           
            <React.Fragment >
              <Button aria-describedby={id} color="inherit" onClick={this.logOut}>
                Logout
        </Button>
            </React.Fragment>
            
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

NavBar_Dashboard.propTypes = {
  classes: PropTypes.object.isRequired,


};

export default withStyles(styles)(withRouter(NavBar_Dashboard));