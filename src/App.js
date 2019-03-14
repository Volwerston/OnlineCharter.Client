import React, { Component } from 'react'
import { Route } from 'react-router-dom'

import DataSourceCreateFormComponent from './components/DataSourceCreateFormComponent'
import DataSourceEditFormComponent from './components/DataSourceEditFormComponent';
import TemplateCreateFormComponent from './components/TemplateCreateFormComponent';
import TemplateInfoComponent from './components/TemplateInfoComponent';
import TemplateVisualizerComponent from './components/TemplateVisualizerComponent';

import MenuComponent from './components/MenuComponent'

class App extends Component {
  render(){
    return (
      <div>
        <div>
          <MenuComponent />
        </div>
        <div>
          <Route path="/" exact component={DataSourceCreateFormComponent} />
          <Route path="/dataSource/:id" exact component={DataSourceEditFormComponent} />
          <Route path="/template/create" exact component={TemplateCreateFormComponent} />
          <Route path="/template/info/:id" exact component={TemplateInfoComponent} />
          <Route path="/template/:id/visualize" exact component={TemplateVisualizerComponent} />
        </div>
      </div>
    );
  }
}

export default App
