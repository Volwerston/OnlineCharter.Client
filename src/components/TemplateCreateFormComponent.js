import React from 'react'
import { connect } from 'react-redux'

import { getUserDataSources, createTemplate, clearResults } from '../actions'

import TemplateSourceComponent from './TemplateSourceComponent'
import TemplateChartTypeComponent from './TemplateChartTypeComponent'
import TemplateKeySelectorComponent from './TemplateKeySelectorComponent'
import TemplateMapFunctionComponent from './TemplateMapFunctionComponent'
import TemplateDataSourceFilterComponent from './TemplateDataSourceFilterComponent'
import TemplateAggregateFunctionComponent from './TemplateAggregateFunctionComponent'

import history from '../utils/history'

class TemplateCreateFormComponent extends React.Component {

    componentWillMount() {
        if (!this.props.user.isAuthenticated) {
            history.push('/');
        }
    }

    componentDidMount() {
        this.props.getUserDataSources();
    }

    componentWillUnmount() {
        this.props.clearResults();
    }

    render() {

        var errorMessage = null;
        var dataSources = [];

        if (this.props.dataSources) {

            if(this.props.dataSources.error){
                errorMessage = (
                    <div class="alert alert-warning alert-dismissible fade show" role="alert">
                        {this.props.dataSources.error}
                        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                );
    
            }
            
            if(this.props.dataSources.result){
                dataSources = this.props.dataSources.result.dataSources;
            }
        }

        return (
            <div>
                <div className="row">
                    {errorMessage}
                </div>
                <div className="row">
                    <div className="col-sm-2"></div>
                    <div className="col-sm-8">
                        <TemplateSourceComponent dataSources={dataSources} />
                        <TemplateChartTypeComponent />
                        <br />
                        <TemplateKeySelectorComponent />
                        <TemplateMapFunctionComponent />
                        <TemplateDataSourceFilterComponent />
                        <TemplateAggregateFunctionComponent />
                        <div className="row">
                            <div className="col-sm-4"></div>
                            <div className="col-sm-4">
                                <button
                                    className="btn btn-block btn-info"
                                    onClick={this.props.createTemplate}>Create</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        dataSources: state.userDataSources,
        user: state.auth
    };
}

export default connect(mapStateToProps, { getUserDataSources, createTemplate, clearResults })(TemplateCreateFormComponent);