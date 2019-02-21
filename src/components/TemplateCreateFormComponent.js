import React from 'react'
import { connect } from 'react-redux'

import TemplateSourceComponent from './TemplateSourceComponent'
import { getUserDataSources } from '../actions'
import TemplateChartTypeComponent from './TemplateChartTypeComponent';

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