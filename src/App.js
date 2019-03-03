import React, { Component } from 'react'
import { Router, Route } from 'react-router-dom'
import history from './utils/history'

import DataSourceCreateFormComponent from './components/DataSourceCreateFormComponent'
import DataSourceEditFormComponent from './components/DataSourceEditFormComponent';
import TemplateCreateFormComponent from './components/TemplateCreateFormComponent';
import TemplateInfoComponent from './components/TemplateInfoComponent';
import TemplateVisualizerComponent from './components/TemplateVisualizerComponent';

class App extends Component {
  render(){
    return (
      <Router history={history}>
        <div>
          <Route path="/" exact component={DataSourceCreateFormComponent} />
          <Route path="/dataSource/:id" exact component={DataSourceEditFormComponent} />
          <Route path="/template/create" exact component={TemplateCreateFormComponent} />
          <Route path="/template/info/:id" exact component={TemplateInfoComponent} />
          <Route path="/template/:id/visualize" exact component={TemplateVisualizerComponent} />
        </div>
      </Router>
    );
  }
}

export default App
