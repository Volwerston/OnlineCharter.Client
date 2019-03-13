import React, { Component } from 'react';
import { connect } from "react-redux";
import { GoogleLogout } from 'react-google-login';
import { withRouter, Redirect } from "react-router-dom";
import { logout } from "../actions";
import config from "../config.json";

class Logout extends Component {
    logout = () => {
        console.log("HEY 1!");
        this.props.logout();
    };

    onFailure = (error) => {
        alert(error);
    };

    render(){
        let content = !this.props.auth.isAuthenticated ?
        (
          <div>
            <Redirect to={{
              pathname: '/'
            }} />
          </div>
        ) :
        (
          <div>
            <GoogleLogout 
            buttonText="Logout" 
            clientId={config.GOOGLE_CLIENT_ID}
            onLogoutSuccess={this.logout}
            onFailure={this.onFailure} />
          </div>
        );
        
        return(
            <div>
                <h1>Logout</h1>
                {content}
            </div>
        );
    }
};

const mapStateToProps = (state) => {
    return {
      auth: state.auth
    };
  };
  
  const mapDispatchToProps = (dispatch) => {
    return {
      logout: () => {
        dispatch(logout());
      }
    }
  };
  
  export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Logout));