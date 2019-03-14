import React from 'react'
import Login from './Login'
import Logout from './Logout'
import { connect } from "react-redux";

class AuthComponent extends React.Component {
    render(){
        if(this.props.auth.isAuthenticated){
            return <Logout />;
        }

        return <Login />;
    }
}

const mapStateToProps = (state) => {
    return {
      auth: state.auth
    };
};

export default connect(mapStateToProps)(AuthComponent)