import React, { Component } from 'react';
import { Route, Router } from 'react-router-dom'
// import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
//HomePage
import Home from '../Components/navBarSimple';



import UserScreen from '../Components/DashBoard/UserView/DetailScreen';
//Resturant
import LocationResturant from '../Components/DashBoard/RestaurantView/Dash_location_rest';
import DashBoardRestaurant from '../Components/DashBoard/RestaurantView/DashBoard_Resturant';

//User
import DashBoardUser from '../Components/DashBoard/UserView/DashBoard_User';
import LocationUser from '../Components/DashBoard/UserView/Dash_Location_User';
//User Components
import Resturant from '../Components/DashBoard/UserView/resturant';

//Chat app
import ChatApp from '../Components/Chat_App/ChatApp';

// import { createBrowserHistory } from 'history';
const BrowserHistory = require("history").createBrowserHistory
const history = BrowserHistory()
console.log(history)

class Routers extends Component {

  render() {
    return (
      <Router history={history}>
        <Route exact path="/" component={Home} />
        <Route path="/DashUser" component={DashBoardUser} />
        <Route path="/LocationUser" component={LocationUser} />
        <Route path="/DetailUserScreen" component={UserScreen} />
        <Route path="/resturant" component={Resturant} />
        <Route path="/DashRest" component={DashBoardRestaurant} />
        <Route path="/LocationRest" component={LocationResturant} />
        {/* <Route path="/Chat" component={ChatApp} /> */}
      </Router>
    );
  }
}
export default Routers;


/* <div>
      <PrivateRoute
        exact
        path="/"
        component={NavBar}
        authenticated={authenticated}
      />
    </div> */