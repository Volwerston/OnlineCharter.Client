import React, { Component } from 'react'
import { BrowserRouter, Route } from 'react-router-dom'

import DataSourceCreateFormComponent from './components/DataSourceCreateFormComponent'

class App extends Component {
  render(){
    return (
      <BrowserRouter>
        <div>
          <Route path="/" exact component={DataSourceCreateFormComponent} />
        </div>
      </BrowserRouter>
    );
  }
}

export default App
