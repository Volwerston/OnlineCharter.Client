import React from 'react'
import AuthComponent from './AuthComponent';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

class MenuComponent extends React.Component {
    render() {

        var rightSide = (
            <ul class="nav navbar-nav ml-auto">
                <li class="nav-item">
                    <AuthComponent />
                </li>
            </ul>
        );

        if (this.props.auth.isAuthenticated) {
            rightSide = (
                <ul class="nav navbar-nav ml-auto">
                    <li class="nav-item">
                        <Link to="#" class="nav-link">Hello, {this.props.auth.user.name}</Link>
                    </li>
                    <li class="nav-item">
                        <AuthComponent />
                    </li>
                </ul>
            );
        }

        return (
            <nav class="navbar navbar-expand-lg navbar-light bg-light">
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarNav">
                    <ul class="navbar-nav">
                        <li class="nav-item">
                            <Link class="nav-link" to="/data-source/create">CREATE DATA SOURCE</Link>
                        </li>
                        <li class="nav-item">
                            <Link class="nav-link" to="/data-sources">MY DATA SOURCES</Link>
                        </li>
                        <li class="nav-item">
                            <Link class="nav-link" to="/template/create">CREATE TEMPLATE</Link>
                        </li>
                        <li class="nav-item">
                            <Link class="nav-link" to="#">MY TEMPLATES</Link>
                        </li>
                    </ul>
                    {rightSide}
                </div>
            </nav>);
    }
}

const mapStateToProps = state => {
    return {
        auth: state.auth
    };
}

export default connect(mapStateToProps)(MenuComponent)