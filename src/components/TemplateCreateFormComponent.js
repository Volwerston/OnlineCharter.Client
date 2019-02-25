import React from 'react'
import { connect } from 'react-redux'

import { getUserDataSources } from '../actions'

import TemplateSourceComponent from './TemplateSourceComponent'
import TemplateChartTypeComponent from './TemplateChartTypeComponent'
import TemplateKeySelectorComponent from './TemplateKeySelectorComponent'
import TemplateMapFunctionComponent from './TemplateMapFunctionComponent'
import TemplateDataSourceFilterComponent from './TemplateDataSourceFilterComponent'
import TemplateAggregateFunctionComponent from './TemplateAggregateFunctionComponent'

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
                    <TemplateMapFunctionComponent />
                    <TemplateDataSourceFilterComponent />
                    <TemplateAggregateFunctionComponent/>
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