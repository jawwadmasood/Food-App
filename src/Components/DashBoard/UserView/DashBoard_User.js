import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';

// helper

import NavBar from '../NavBar_Dashboard';
//Components
import Restaurant from './resturant';
import Request from './request';


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

class UserView extends React.Component {
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
        const { value } = this.state;
        return (
            <div className={classes.root}>
                <NavBar />
                <AppBar position="static">
                    <Tabs value={value} onChange={this.handleChange}>
                        <Tab label="Restaurant" />
                        <Tab label="Request" />
                    </Tabs>
                </AppBar>
                {value === 0 && <Restaurant />}

                {value === 1 && <Request />}

            </div>
        );
    }
}

UserView.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(stylesTab)(UserView);