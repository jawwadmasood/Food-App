import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
// import AppBar from '@material-ui/core/AppBar';
// import Tabs from '@material-ui/core/Tabs';
// import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import MaterialTable from 'material-table';

import firebase from '../../../config/firebase';

var db = firebase.database();
// var auth = firebase.auth();


function TabContainer(props) {
    return (
        <Typography component="div" style={{ padding: 8 * 3 }}>
            {props.children}
        </Typography>
    );
}

TabContainer.propTypes = {
    children: PropTypes.node.isRequired,
};

const stylesTab = theme => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
    },
});

class Rest_Delivered extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 0,

            text: '',
            search: false,
            rest_my_Uid: '',

            //sort data
            columns: [
                { title: 'Item', field: 'item' },
                { title: 'Price', field: 'price' },
                // { title: 'City', field: 'city' },
            ],

            data: [
                {
                    item: '',
                    price: '',
                    // city: '',
                    // rating: '',
                    // uid: '',

                },
            ],
        };

    }

    componentDidMount() {


        let localUid = localStorage.getItem("uid");
        let uid = JSON.parse(localUid)
        // console.log(uid)
        this.setState({ rest_my_Uid: uid })

        db.ref("users/" + uid + "/allRequests").once("child_added", (data) => {
            let request_Data = data.val();
            console.log(request_Data)
            let array = []
            array.push(request_Data)
            console.log('array===>>>0', array)
            let filtered = array.filter((e) => {
                return e.status === "delivered"
                // console.log(e.status)
            })
            // array.push(filtered)
            this.setState({ data: filtered })
            // console.log('filter===>', filtered)
        })
    }

    handleChange = (event, value) => {
        this.setState({ value });
    };

    render() {
        const { data} = this.state;
        // console.log('Data==>>', data)
        return (
            <MaterialTable
                title=" Orders Delivered"
                columns={this.state.columns}
                data={data}

            />

        );
    }
}

Request.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(stylesTab)(Rest_Delivered);