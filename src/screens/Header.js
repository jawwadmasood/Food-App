import React from 'react';
import { connect } from 'react-redux';

class Header extends React.Component {
    logout(){
        console.log('gg')
       
    }
    render() {
        return (
            <div style={{width: '100%', height: 30, backgroundColor: 'gray', color: 'white', textAlign: 'right'}}>
                {this.props.user && this.props.user.name}
                <button onClick={this.logout.bind(this)}>Logout</button>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps, null)(Header);
