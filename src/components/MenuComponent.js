import React from 'react'
import AuthComponent from './AuthComponent';

class MenuComponent extends React.Component {
    render() {
        return (
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="nav navbar-nav ml-auto">
                    <li class="nav-item">
                        <AuthComponent />
                    </li>
                </ul>
            </div>
        </nav>);
    }
}

export default MenuComponent