import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';

// Users_order_updates
import Pending from './User_pending';
import Inprogress from './User_Inprogress';
import Delivered from './User_Delivered';

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

class Request extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 0,
        };
    }
    
    handleChange = (event, value) => {
        this.setState({ value });
    };

    render() {
        const { classes } = this.props;
        const { value, myRequests, filteredArray} = this.state;
        // console.log('requset==>>', myRequests)
        // console.log('Filtered==>>', filteredArray)
        return (
            <div className={classes.root}>
                <AppBar position="static">
                    <Tabs value={value} style={{backgroundColor:'grey'}} onChange={this.handleChange}>
                        <Tab label="Pending" />
                        <Tab label="In Progress" />
                        <Tab label="Delivered" />
                    </Tabs>
                </AppBar>
                {value === 0 && <Pending/>}

                {value === 1 && <Inprogress/>}

                {value === 2 && <Delivered/>}
            </div>
        );
    }
}

Request.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(stylesTab)(Request);