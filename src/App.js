import React, { Component } from 'react'
import { Route } from 'react-router-dom'

import DataSourceCreateFormComponent from './components/DataSourceCreateFormComponent'
import DataSourceEditFormComponent from './components/DataSourceEditFormComponent';
import TemplateCreateFormComponent from './components/TemplateCreateFormComponent';
import TemplateInfoComponent from './components/TemplateInfoComponent';
import TemplateVisualizerComponent from './components/TemplateVisualizerComponent';

import MenuComponent from './components/MenuComponent'
import LandingComponent from './components/LandingComponent';

class App extends Component {
  render(){
    return (
      <div>
        <div>
          <MenuComponent />
        </div>
        <div>
          <Route path="/" exact component={LandingComponent} />
          <Route path="/data-source/create" exact component={DataSourceCreateFormComponent} />
          <Route path="/data-source/:id/info" exact component={DataSourceEditFormComponent} />
          <Route path="/template/create" exact component={TemplateCreateFormComponent} />
          <Route path="/template/:id/info" exact component={TemplateInfoComponent} />
          <Route path="/template/:id/visualize" exact component={TemplateVisualizerComponent} />
        </div>
      </div>
    );
  }
}

export default App
