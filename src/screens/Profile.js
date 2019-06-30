import React from 'react';
import { connect } from 'react-redux';
import Header from './Header';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps";

//firebase playground

const MyMapComponent = withScriptjs(withGoogleMap((props) =>
  <GoogleMap
    defaultZoom={8}
    defaultCenter={{ lat: 24.8827229, lng: 67.0659646 }}
  >
    {props.isMarkerShown && <Marker draggable={true} position={{ lat: 24.8827229, lng: 67.0659646 }} />}
  </GoogleMap>
))
class Profile extends React.Component {
    constructor(){
        super();
        this.state={

        }
    }

// componentDidMount(){
// navigator.geolocation.getCurrentPosition(location)=>{
//     this.state({
//         lat:location.coords.latitude,
//         lng: location.coords.
//     })
// }

// }
    
    render() {
        return (
            <div>
            <Header />
                <h1>Dashboard</h1>
                <p>Name: Jawwad</p>
                <p>Age: </p>
                {/* <p><img src={this.props.user.profile_pic} /></p> */}
            
            <MyMapComponent
            isMarkerShown
            googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
            loadingElement={<div style={{ height: `100%` }} />}
            containerElement={<div style={{ height: `400px` }} />}
            mapElement={<div style={{ height: `100%` }} />}
          />
          </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps, null)(Profile);
