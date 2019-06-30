import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
// import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
// import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';


import { withRouter } from "react-router-dom";

import firebase from '../../config/firebase';
import { storage } from '../../config/firebase';


var db = firebase.database();
var auth = firebase.auth();
// var storage= firebase.storage();

class SignupResturant extends Component {
    constructor() {
        super();
        this.state = {
            data: {
                name: '',
                email: '',
                country: '',
                city: '',
                password: '',
                confirmPass: '',
                foodItem: '',
                rating: '',
                pictures: {},
            },

            errors: {},
            // data:[],

            show: false,
            open: false,
            loading: false,
            //   user: null,
            // avatar: "",
            // isUploading: false,
            // progress: 0,
            // avatarURL: "",

            imgUrl: '',
        }
        this.handleClickOpen = this.handleClickOpen.bind(this)
        this.handleClose = this.handleClose.bind(this)
        // this.signupForm = this.signupForm.bind(this)
    }

    handleClickOpen() {
        this.setState({ show: true });
        // setOpen(true);
    }

    handleClose() {
        this.setState({ show: false });
    }

    handleSubmit = (e) => {
        console.log(e)
        e.preventDefault();
        const { data, image } = this.state;
        console.log(data.pictures)
        // console.log(password)
        this.setState({ loading: true })
        auth.createUserWithEmailAndPassword(data.email, data.password)
            // .then(() => { alert('hogia')})
            .then((success) => {
                // document.getElementById("loaders").style.display = 'none';
                let restaurantObj = {
                    name: data.name,
                    email: data.email,
                    country: data.country,
                    city: data.city,
                    category: "restaurant",
                    foodItem: data.foodItem,
                    rating: data.rating,
                    createTime: firebase.database.ServerValue.TIMESTAMP,
                    uid: success.user.uid,

                }
                let userUid = firebase.auth().currentUser.uid
                console.log(userUid)
                localStorage.setItem("restUid", JSON.stringify(userUid))

                let user = auth.currentUser;
                user.sendEmailVerification()

                // Cover Image Restaurant
                let storageRef = storage.ref(`restaurantImages/${userUid}/${image.name}`)
                storageRef.put(image)
                    .then((snapshot) => {
                        //progress function......
                        snapshot.ref.getDownloadURL().then((sanpUrl) => {
                            console.log(sanpUrl)
                            restaurantObj.img = sanpUrl
                            this.setState({
                                imgUrl: sanpUrl,
                            })
                            db.ref('users/' + userUid + '/account')
                                .set(restaurantObj)
                                .then(() => { alert('Account Created! .. Email send for Verification') })
                            this.props.history.push("/LocationRest")
                        })
                    })
            })
            // (error) => {
            //     //error function......
            //     console.log(error);
            // },
            // () => {
            //     //complete function......
            //     storage.ref('restaurantImages').child(userUid + image.name)
            //         .getDownloadURL().then(url => {
            //             console.log(url);
            //             this.setState({
            //                 imgUrl: url,
            //             })
            //         })
            // });
            // })





            //     let storageRef = firebase.storage().ref(`restaurantImages/${userUid}/${image.name}`).put(image);
            //     storageRef.put(data.pictures)
            //         .then((snapshot) => {
            //             snapshot.ref.getDownloadURL().then((sanpUrl) => {
            //                 console.log(sanpUrl)
            //                 restaurantObj.img = sanpUrl

            //                     firebase.database().ref('restaurant/' + userUid)
            //                         .push(restaurantObj)
            //                         .then(() => { alert('db done') })
            //                     })
            //                 })       
            // })
            .catch((error) => {
                console.log(error);
            })
        // });
    }


    handleChange = e =>
        this.setState({
            data: { ...this.state.data, [e.target.id]: e.target.value }
        });

    // repeat password validation ***********
    componentDidMount() {
        // custom rule will have name 'isPasswordMatch'
        ValidatorForm.addValidationRule('isPasswordMatch', (value) => {
            if (value !== this.state.data.password) {
                return false;
            }
            return true;
        });
    }

    componentWillUnmount() {
        // remove rule when it is not needed
        ValidatorForm.removeValidationRule('isPasswordMatch');
    }



    handleUploadStart = () => this.setState({ isUploading: true, progress: 0 });
    handleProgress = progress => this.setState({ progress });
    handleUploadError = error => {
        this.setState({ isUploading: false });
        console.error(error);
    };
    handleUploadSuccess = filename => {
        this.setState({ avatar: filename, progress: 100, isUploading: false });
        firebase
            .storage()
            .ref("images")
            .child(filename)
            .getDownloadURL()
            .then(url => this.setState({ avatarURL: url }));
    };


    imageUpload = e => {
        if (e.target.files[0]) {
            const image = e.target.files[0];
            this.setState(() => ({ image }));
        }
    }

    render() {
        // const classes = useStyles();
        const { show, data } = this.state;
        // console.log(data)
        // console.log(imgUrl)
        // console.log('normal open....===>>', open)
        return (
            <div>

                <Button color="inherit" onClick={this.handleClickOpen}>
                    Register Resturant
      </Button>
                <Dialog open={show} onClose={this.handleClose} aria-labelledby="form-dialog-title">
                    <ValidatorForm
                        ref="form"
                        onSubmit={this.handleSubmit}
                        onError={errors => console.log(errors)}
                    >
                        <DialogTitle id="form-dialog-title">Register Resturant</DialogTitle>
                        <DialogContent>
                            {/* <DialogContentText>
            To subscribe to this website, please enter your email address here. We will send updates
            occasionally.
          </DialogContentText> */}

                            <TextValidator
                                autoFocus
                                margin="dense"
                                id="name"
                                label="Full Name"
                                // onChange={(e) => { this.setState({ fullName: e.target.value }) }}
                                onChange={this.handleChange}
                                value={data.name}
                                type="text"
                                validators={['required']}
                                errorMessages={['this field is required', 'use only alphabet A to Z']}
                                fullWidth
                            />

                            <TextValidator
                                autoFocus
                                margin="dense"
                                id="email"
                                label="Email Address"
                                onChange={this.handleChange}
                                value={data.email}
                                type="email"
                                validators={['required', 'isEmail']}
                                errorMessages={['this field is required', 'email is not valid']}
                                fullWidth
                            />
                            <TextValidator
                                autoFocus
                                margin="dense"
                                id="country"
                                label="Country"
                                onChange={this.handleChange}
                                value={data.country}
                                type="text"
                                validators={['required']}
                                errorMessages={['this field is required']}
                                fullWidth
                            />
                            <TextValidator
                                autoFocus
                                margin="dense"
                                id="city"
                                label="City"
                                onChange={this.handleChange}
                                value={data.city}
                                type="text"
                                validators={['required']}
                                errorMessages={['this field is required']}
                                fullWidth
                            />
                            <TextValidator
                                autoFocus
                                margin="dense"
                                id="password"
                                label="Password"
                                onChange={this.handleChange}
                                value={data.password}
                                type="password"
                                validators={['required']}
                                errorMessages={['this field is required']}
                                fullWidth
                            />
                            <TextValidator
                                autoFocus
                                margin="dense"
                                id="confirmPass"
                                label="Confirm Password"
                                onChange={this.handleChange}
                                value={data.confirmPass}
                                type="password"
                                validators={['isPasswordMatch', 'required']}
                                errorMessages={['password mismatch', 'this field is required']}
                                fullWidth
                            />

                            <TextValidator
                                autoFocus
                                margin="dense"
                                id="foodItem"
                                label="Food Items"
                                // onChange={(e) => { this.setState({ fullName: e.target.value }) }}
                                onChange={this.handleChange}
                                value={data.foodItem}
                                type="text"
                                validators={['required']}
                                errorMessages={['this field is required', 'use only alphabet A to Z']}
                                fullWidth
                            />
                            <TextValidator
                                autoFocus
                                margin="dense"
                                id="rating"
                                label="Rating"
                                onChange={this.handleChange}
                                value={data.rating}
                                type="number"
                                validators={['required', 'matchRegexp:^[0-9]$', 'minNumber:0', 'maxNumber:255',]}
                                errorMessages={['this field is required', 'rating should be between 0 to 9']}
                                fullWidth
                            />
                            <TextValidator
                                label="Upload"
                                accept="image/*"
                                id="pictures"
                                onChange={this.imageUpload}
                                type="file"
                                width='320' // maximum width
                                height='240' // maximum height
                            />
                            {/* <FileUploader
                                accept="image/*"
                                name="avatar"
                                randomizeFilename
                                storageRef={firebase.storage().ref("images")}
                                onUploadStart={this.handleUploadStart}
                                onUploadError={this.handleUploadError}
                                onUploadSuccess={this.handleUploadSuccess}
                                onProgress={this.handleProgress}
                            /> */}
                        </DialogContent>

                        <DialogActions>
                            <Button onClick={this.handleClose} color="primary">
                                Cancel
          </Button>
                            <Button type="submit" color="primary">
                                Signup
          </Button>
                        </DialogActions>
                    </ValidatorForm>
                </Dialog>
            </div>
        );

    }
}

export default withRouter(SignupResturant);