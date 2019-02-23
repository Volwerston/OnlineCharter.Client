import React from 'react'
import { connect } from 'react-redux'

import { getUserDataSources } from '../actions'

import TemplateSourceComponent from './TemplateSourceComponent'
import TemplateChartTypeComponent from './TemplateChartTypeComponent';
import TemplateKeySelectorComponent from './TemplateKeySelectorComponent';

class TemplateCreateFormComponent extends React.Component {
    
    componentDidMount(){
        this.props.getUserDataSources(1);
    }

    render(){
        return (
            <div className="row">
                <div className="col-sm-2"></div>
                <div className="col-sm-8">
                    <TemplateSourceComponent dataSources={this.props.dataSources} />
                    <TemplateChartTypeComponent />
                    <br/>
                    <TemplateKeySelectorComponent />
                </div>
            </div>
        );
    }
}

function mapStateToProps(state){
    return {
        dataSources: state.userDataSources
    };
}

export default connect(mapStateToProps, { getUserDataSources })(TemplateCreateFormComponent);