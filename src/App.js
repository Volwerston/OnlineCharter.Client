import React, { Component } from 'react'
import { Router, Route } from 'react-router-dom'
import history from './utils/history'

import DataSourceCreateFormComponent from './components/DataSourceCreateFormComponent'
import DataSourceEditFormComponent from './components/DataSourceEditFormComponent';

class App extends Component {
  render(){
    return (
      <Router history={history}>
        <div>
          <Route path="/" exact component={DataSourceCreateFormComponent} />
          <Route path="/dataSource/:id" exact component={DataSourceEditFormComponent} />
        </div>
      </Router>
    );
  }
}

export default App
