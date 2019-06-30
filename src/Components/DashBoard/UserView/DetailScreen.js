import React from 'react';
import { withRouter } from "react-router-dom";
// helper
// import MaterialTable from 'material-table';
import NavBar from '../NavBar_Dashboard';
// import Card from '../../../Helper/cardMaterial';


//Material Card
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
// import classnames from 'classnames';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
// import CardActions from '@material-ui/core/CardActions';
// import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
// import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import red from '@material-ui/core/colors/red';
// import FavoriteIcon from '@material-ui/icons/Favorite';
// import ShareIcon from '@material-ui/icons/Share';
// import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
// import MoreVertIcon from '@material-ui/icons/MoreVert';

import Button from '@material-ui/core/Button';

//Firebase
import firebase from '../../../config/firebase';

var db = firebase.database();
// var auth = firebase.auth();

const styles = theme => ({
    card: {
        maxWidth: 400,
    },
    media: {
        height: 0,
        // width: 350,
        paddingTop: '56.25%', // 16:9
    },
    actions: {
        display: 'flex',
    },
    // expand: {
    //     transform: 'rotate(0deg)',
    //     marginLeft: 'auto',
    //     transition: theme.transitions.create('transform', {
    //         duration: theme.transitions.duration.shortest,
    //     }),
    // },
    // expandOpen: {
    //     transform: 'rotate(180deg)',
    // },
    avatar: {
        backgroundColor: red[500],
    },
});

class UserDetailScreen extends React.Component {
    state = {
        value: 0,
        text: '',
        search: false,
        abc: '',


        //sort data
        columns: [
            { title: 'Name', field: 'name' },
            { title: 'Food Item', field: 'foodItem' },
            { title: 'City', field: 'city' },
            { title: 'img', field: 'img' },
            // {
            //     title: 'Rating',
            //     field: 'rating',
            //     // lookup: { 34: 'İstanbul', 63: 'Şanlıurfa' },
            // },
            // {title:'Detail'}
        ],

        data: [

            {
                name: '',
                foodItem: '',
                city: '',
                // img:`<img src=${this.data.img} height='300px' width='200px'/>`,
                img: '',
                // rating: '',

            },
        ],
    };

    componentDidMount() {

        let localUid = localStorage.getItem("restUid");
        let restUid = JSON.parse(localUid)
        console.log(restUid)
        this.setState({ restUid })
        db.ref('users/' + restUid).on('value', (rest_Data) => {
            // console.log(rest_Data)
            this.setState({ account: rest_Data.val().account })
            this.setState({ main: rest_Data.val().main })
            this.setState({ location: rest_Data.val().location })
            // console.log(this.state.account) 
            // console.log(this.state.main) 
            // console.log(this.state.location) 
            let resturantData = rest_Data.val();
            // console.log(resturantData)   

            let array = []
            for (var key in resturantData) {

                resturantData[key].keyId = key
                // console.log(resturantData[key])
                array.push(resturantData[key])
            }

            // let array = []
            // for (var key in resturantData) {
            //     // for (var key2 in resturantData[key]) {
            //     resturantData[key].keyId = key
            //     // console.log(resturantData[key][key2].category)
            //     // if (resturantData[key].category === "restaurant") {
            //     array.push(resturantData[key])
            //     array.forEach((v, i ) => {
            //         // console.log(v)
            //           this.setState({
            //             abc: v
            //         })
            //     })
            // }
            // }
            // }

            // array.map((v, i ) => {
            //     console.log(v)
            //         this.setState({
            //             abc: v
            //         })
            //     })
            // console.log(array)

            this.setState({
                data: array
            })

        })
    }

    order = (price, items) => {
        const { data }=this.state;
        // console.log(data[0].foodItem)
        let resId = this.state.restUid
        // console.log(resId)
        let userId = firebase.auth().currentUser.uid
        // console.log(userId)
        let resID_key = firebase.database().ref("users/" + resId + "/allRequests").push().key;
        // console.log('restId_Key====<>>>>', resID_key)

        let userID_key = db.ref("users/" + userId + "/myRequests").push().key;
        // console.log('userId_Key====<>>>>', userID_key)

        let restObj = {
            name: data[0].name,
            price: 'Rs.250',
            uid: userId,
            status: "pending",
            item: data[0].foodItem,
            keyId_Rest: resID_key,
            keyId_User: userID_key,
        }
        let userObj = {
            name: data[0].name,
            price: 'Rs.250',
            item: data[0].foodItem,
            uid: resId,
            status: "pending",
            keyId_User: userID_key,
            keyId_Rest: resID_key,
        }

        db.ref("users/" + resId + "/allRequests/" + resID_key).set(restObj)
        db.ref("users/" + userId + "/myRequests/" + userID_key).set(userObj)
            .then(() => {

                alert('order placed')
            })

    }



    render() {
        const { classes } = this.props;
        const { data } = this.state;
        // console.log(data.city)
        // console.log('data==>>>', data)
        // console.log(abc.city)
        // console.log(abc)
        return (
            <div >

                {/* <img src={`require(${data.img})`} height='300px' width='200px' /> */}
                {/* <img src={abc.img} alt=""/> */}
                <NavBar />
                <Typography variant="h1" component="h1" style={{ textAlign: "center" }}>
                    Food Category  <br/>
                </Typography>
                <br/>
                <Card className={classes.card}>
                    <CardHeader
                        avatar={
                            <Avatar aria-label="Recipe" className={classes.avatar}>
                                {/* {data[0].img} */}
                            </Avatar>
                        }
                        action={
                            // <IconButton>
                            <Button onClick={this.order.bind()} variant="outlined" color="primary" className={classes.button}>
                                Order Now
                             </Button>
                            // </IconButton>
                        }
                        title={data[0].name}
                        subheader="June 25, 2019"
                    />
                    <CardMedia
                        className={classes.media}
                        image={data[0].img}
                        title="Biryani"
                    />
                    <CardContent>

                        {/* <Typography component="p"> */}
                        <Typography style={{ textAlign: "center" }} variant="h4" component="h4">{data[0].foodItem}</Typography>  
                        <Typography>
                            <li>  This food is delicious to eat.</li>
                            <li>  Price: Rs.250</li>
                        </Typography>
                    </CardContent>
                    {/* <CardActions className={classes.actions}  >
                        <IconButton aria-label="Order Now">
                            <FavoriteIcon />
                        </IconButton>
                        
                        <IconButton aria-label="Live Chat">
                            <ShareIcon />
                            <svg onClick={console.log('chat')} width="24" height="24" viewBox="0 0 24 24"><path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM6 9h12v2H6V9zm8 5H6v-2h8v2zm4-6H6V6h12v2z"/></svg>								
                           
                        </IconButton>
                    </CardActions> */}
                    <CardHeader
                        action={
                            // <IconButton>
                            <Button  variant="outlined" color="primary" className={classes.button}>
                                Chat Now
                         </Button>
                            // </IconButton>
                        }
                    />

                </Card>
            </div>
        );
    }
}

UserDetailScreen.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(withRouter(UserDetailScreen));