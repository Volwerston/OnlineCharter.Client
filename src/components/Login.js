import React, { Component } from 'react';
import { GoogleLogin } from 'react-google-login';
import { connect } from "react-redux";
import { login } from "../actions";
import config from "../config.json";
import { withRouter, Redirect } from "react-router-dom";

class Login extends Component {

    onFailure = (error) => {
      alert(error);
    };
  
    googleResponse = (response) => {
      const tokenBlob = new Blob([JSON.stringify({ tokenId: response.tokenId }, null, 2)], { type: 'application/json' });
      const options = {
        method: 'POST',
        body: tokenBlob,
        mode: 'cors',
        cache: 'default'
      };
      fetch(config.GOOGLE_AUTH_CALLBACK_URL, options)
        .then(r => {
          r.json().then(user => {
            const token = user.token;
            const id = user.id;
            const name = user.name;
            this.props.login({ token: token, id: id, name: name });
          });
        })
    };
  
    render() {
      let content = !!this.props.auth.isAuthenticated ?
        (
          <div>
            <Redirect to={{
              pathname: '/'
            }} />
          </div>
        ) :
        (
          <div>
            <GoogleLogin
              clientId={config.GOOGLE_CLIENT_ID}
              buttonText="Login"
              onSuccess={this.googleResponse}
              onFailure={this.onFailure}
            />
          </div>
        );
  
      return (
        <div>
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
      login: (token) => {
        dispatch(login(token));
      }
    }
  };
  
  export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login));