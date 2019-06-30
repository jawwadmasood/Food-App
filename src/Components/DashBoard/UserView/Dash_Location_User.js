import React, { Component } from 'react';
import firebase from '../../../config/firebase';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"
//Components
import NavBar from '../NavBar_Dashboard';

var db = firebase.database();
class LocationResturant extends Component {
    constructor() {
        super()
        this.state = {
            lat: null,
            lng: null,
            stylish: {
                color: "black",
                fontSize: "15px",
                marginTop: "10px",
                marginRight: "2px"
            },
            styfish: {
                color: "black",
                fontSize: "15px",
                marginTop: "10px",
                marginRight: "2px",
                marginLeft: "10px"
            },
        }
        this.check = []
    }

    componentDidMount() {
        navigator.geolocation.getCurrentPosition((location) => {
            this.setState({
                lat: location.coords.latitude,
                lng: location.coords.longitude,
            })
        });
        let localUid = localStorage.getItem("Useruid")
        let uid= JSON.parse(localUid)
        console.log(' Useruid ===>>', uid)
        this.setState({ uid })
       db.ref("users/" + uid + "/location").on("value", (data) => {
            if (data.val() === null) {

            } else {
                this.props.history.push("/DashUser")
            }
        })
    }

    done() {
        let lat = this.state.lat
        let lng = this.state.lng
        let userObjLocate = {
            lat,
            lng
        }
        this.check.map((e_google_map) => console.log(e_google_map))
        db.ref('users/' + this.state.uid + '/location').set(userObjLocate)
       db.ref('users/' + this.state.uid + '/main').set(this.check.map((e_google_map) => { return e_google_map }))
            .then(() => { this.props.history.push("/DashUser") })
    }

    render() {
        const { lat, lng } = this.state

        const MyMapComponent = withScriptjs(withGoogleMap((props) =>
            <GoogleMap
                defaultZoom={14}
                defaultCenter={{ lat: lat, lng: lng }}
            >
                {props.isMarkerShown &&
                    <Marker position={{ lat: lat, lng: lng }} draggable={true} onDragEnd={(e) => this.setState({ lat: e.latLng.lat(), lng: e.latLng.lng() })} />}
            </GoogleMap>
        ))

        return (
            <>
                <NavBar />
                <MyMapComponent
                    isMarkerShown
                    location={{ lat, lng }}
                    googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
                    loadingElement={<div style={{ height: `100%` }} />}
                    containerElement={<div style={{ height: `400px`, marginTop: "30px" }} />}
                    mapElement={<div style={{ height: `100%` }} />}
                />
                
                <button style={{ padding: "10px", width: "auto", float: "right", margin: "10px", border: "1px solid black", borderRadius: "3px" }} onClick={this.done.bind(this)}>Done</button>
            </>
        )
    }
}

export default LocationResturant;
