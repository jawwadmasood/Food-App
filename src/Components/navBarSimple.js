import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

// import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Paper from '@material-ui/core/Paper';

import Popper from '@material-ui/core/Popper';

import LoginDialog from './Authentication/loginDialog';
import SignupUser  from './Authentication/signUpUser';
import SignupResturant from './Authentication/signUpResturant';
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
    // top: 36,
    // right: 0,
    // left: 0,
    width: 'max-content',
  },

});

class NavBar extends Component {
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


  handleClick = event => {
    const { currentTarget } = event;
    this.setState(state => ({
      anchorEl: state.anchorEl ? null : currentTarget,
    }));
  };


  render() {
    // Styling
    const { classes } = this.props;


    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);
    const id = open ? 'no-transition-popper' : null;
    // // Properties
    // const { name, isPerformingAuthAction, isSignedIn, user } = this.props;

    // // Events
    // const { onSignUpClick, onSignInClick } = this.props;

   
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
              <LoginDialog />
              <Button aria-describedby={id} color="inherit" onClick={this.handleClick}>
                Signup
        </Button>
              <Popper id={id} open={open} anchorEl={anchorEl}>
                <Paper>
                  <SignupUser />
                  <SignupResturant />
                </Paper>
              </Popper>
            </React.Fragment>
            

            
            {/* {isSignedIn &&
            <React.Fragment>
              <IconButton color="inherit" disabled={isPerformingAuthAction} onClick={this.openMenu}>
                {user.photoURL ? <Avatar alt="Avatar" src={user.photoURL} /> : <PersonIcon />}
              </IconButton>

              <Menu anchorEl={menu.anchorEl} open={Boolean(menu.anchorEl)} onClose={this.closeMenu}>
                <MenuItem disabled={isPerformingAuthAction} onClick={this.handleSettingsClick}>Settings</MenuItem>
                <MenuItem disabled={isPerformingAuthAction} onClick={this.handleSignOutClick}>Sign out</MenuItem>
              </Menu>
            </React.Fragment>
          }

          {!isSignedIn &&
            <React.Fragment>
              <Button className={classes.signUpButton} color="inherit" disabled={isPerformingAuthAction}  onClick={onSignUpClick}>Sign Up</Button>
              <Button color="inherit" disabled={isPerformingAuthAction}  onClick={onSignInClick}>Sign In</Button>
            </React.Fragment>
          } */}


          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

NavBar.propTypes = {
  classes: PropTypes.object.isRequired,


};

export default withStyles(styles)(NavBar);