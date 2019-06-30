import React from 'react';
import { update_user } from '../store/action';
import { connect } from 'react-redux';

import firebase from '../config/firebase';
import { async } from 'q';

import LoginForm from '../Components/Authentication/loginDialog';
var db = firebase.database();
var auth = firebase.auth();

class Login extends React.Component {
    constructor(){
        super();
        this.state={
            // rememberMe: false,
            email: '',
            password: '',
        }
    }
    // componentDidMount(){
    //     console.log('component did mount ===>>>', this.props)
    //     if( this.state.rememberMe){
    //         this.props.afterLogin();
    //     }
    //     else{
    //         alert('hi')
    //     }
    // }


    login() {
        //firebase api

        const user = {
            name: 'Jawwad Masood',
            age: 30,
            profile_pic: 'https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png',
        }

        // update_user(user); how to call action?
        // console.log('this.props===>>', this.props)
        this.props.store_user(user)
        this.props.afterLogin();
    }

    render() {
        return (
            <div>
                <input placeholder="email" />
                <input placeholder="password" />
                <button onClick={this.login.bind(this)}>Login</button>
                <div className="form-group">
            <label htmlFor="rememberMe">Remember me</label>
            <input type="checkbox" className="form-control" id="rememberMe" ref="rememberMe"
             placeholder="Remember Me" onChange={this.toggleRememberMe} />
          </div>
          {/* <LoginForm /> */}
            </div>
        )
    }
}

const mapStateToProps = state => {
    console.log('state from login mapStateToPRops====>>>>>', state)
    return {
        user: state.user
    }
}
// jab jab store ya state update hoga reducer se ye mapStateToProps dobara call hoga
// yeh hamesha listen karega k store mai kuch changing hoi to yeh chalega
// state yeh global redux store hai jahan se state milti hai .


const mapDispatchToProps = dispatch => {
    return {
        store_user: (user) => dispatch(update_user(user)) //dispatch()k parameter main import wala update_user lyengay
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Login);

// mapDispatchToprops