import React from 'react'
import { connect } from 'react-redux'

import TemplateSourceComponent from './TemplateSourceComponent'
import { getUserDataSources } from '../actions'

class TemplateCreateFormComponent extends React.Component {
    
    componentDidMount(){
        this.props.getUserDataSources(1);
    }

    render(){
        return (
            <div className="row">
                <div className="col-sm-12">
                    <TemplateSourceComponent dataSources={this.props.dataSources} />
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