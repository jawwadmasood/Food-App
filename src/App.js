import React from 'react';
// import logo from './logo.svg';
import './App.css';

import { store, persistor } from './store';
import { PersistGate } from 'redux-persist/integration/react'

import { Provider } from 'react-redux';
// routing***********
// import Navigations from './config/router';
// import LoginDialog from './Components/Authentication/loginDialog';
// import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
// import PrivateRoute from './config/privateRoute';

import Routers from './config/router';
import firebase from './config/firebase';



// var db = firebase.database();
var auth = firebase.auth();



class App extends React.Component {
  state = {
    loading: true, authenticated: false, user: null,
  }
  componentWillMount() {
    auth.onAuthStateChanged(user => {
      if (user) {
        this.setState({ authenticated: true, currentUser: user, loading: false });
      } else {
        this.setState({ authenticated: false, currentUser: null, loading: false });
      }
    });
  }
  render() {
    const { loading } = this.state;
    if (loading) { return <p>Loading..</p>; }
    return (
      <Provider store={store} >
        <PersistGate loading={null} persistor={persistor}>
        <Routers />
        </PersistGate>
      </Provider>
    );
  }
}

export default App;
