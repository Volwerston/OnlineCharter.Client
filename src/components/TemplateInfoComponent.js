import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import { getTemplate, removeTemplate, clearResults } from '../actions'
import history from '../utils/history'

class TemplateInfoComponent extends React.Component {

    componentWillMount(){
        if(!this.props.user.isAuthenticated){
            history.push('/');
        }
    }

    componentWillUnmount(){
        this.props.clearResults();
    }

    componentDidMount(){
        this.props.getTemplate(this.props.match.params.id);
    }

    removeTemplate = () => {
        this.props.removeTemplate(this.props.match.params.id);
    };

    renderTemplate(){
        if(!this.props.template){
            return <div>Loading...</div>;
        }

        if(this.props.template.error){
            return (
                <div class="alert alert-warning alert-dismissible fade show" role="alert">
                {this.props.template.error}
                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>);
        }

        if(this.props.removeTemplateResult && this.props.removeTemplateResult.error){
            return (
                <div class="alert alert-warning alert-dismissible fade show" role="alert">
                {this.props.removeTemplateResult.error}
                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>);
        }

        var filter = this.props.template.result.dataSourceFilter;

        return (
            <div className="row">
                <div className="col-sm-3"></div>
                <div 
                    className="col-sm-6"
                    style={{
                        borderRadius: '5px',
                        backgroundColor: '#F6F2F2',
                        padding: '10px',
                        marginTop: '30px'
                    }}>
                    <div className="row">
                        <div className="col-md-6">
                            <p className="text-left">
                                <b>Id:</b>
                            </p>
                        </div>
                        <div className="col-md-6">
                            <p className="text-right">
                                {this.props.template.result.id}
                            </p>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6">
                            <p className="text-left">
                                <b>Data source id:</b>
                            </p>
                        </div>
                        <div className="col-md-6">
                            <p className="text-right">
                                {this.props.template.result.dataSourceId}
                            </p>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6">
                            <p className="text-left">
                                <b>Name:</b>
                            </p>
                        </div>
                        <div className="col-md-6">
                            <p className="text-right">
                                {this.props.template.result.name}
                            </p>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6">
                            <p className="text-left">
                                <b>Creation date:</b>
                            </p>
                        </div>
                        <div className="col-md-6">
                            <p className="text-right">
                                {this.props.template.result.created}
                            </p>
                        </div>
                    </div>
                    <br/>
                    <div className="row">
                        <div className="col-md-6">
                            <p className="text-left">
                                <b>Filter:</b>
                            </p>
                        </div>
                        <div className="col-md-6">
                            <p className="text-right">
                                {filter.leftVal} {filter.comparator} {filter.rightVal}
                            </p>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6">
                            <p className="text-left">
                                <b>Key selector:</b>
                            </p>
                        </div>
                        <div className="col-md-6">
                            <p className="text-right">
                                {this.props.template.result.keySelector.returnValue}
                            </p>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6">
                            <p className="text-left">
                                <b>Map function:</b>
                            </p>
                        </div>
                        <div className="col-md-6">
                            <p className="text-right">
                                {this.props.template.result.mapFunction.returnValue}
                            </p>
                        </div>
                    </div>
                    <br/>
                    <div className="row">
                        <div className="col-sm-12">
                            <button 
                                type="button" 
                                style={{ margin: '3px' }} 
                                className="btn btn-danger float-right"
                                onClick={this.removeTemplate}>
                                Remove
                            </button>
                            <Link to={`/template/${this.props.match.params.id}/visualize`}>
                            <button 
                                type="button" 
                                style={{ margin: '3px' }} 
                                className="btn btn-info float-right">
                                Visualize
                            </button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    render(){
        return this.renderTemplate();
    }
}

const mapStateToProps = state => {
    return {
        template: state.currentTemplate,
        user: state.auth,
        removeTemplateResult: state.removeTemplateResult
    };
}

export default connect(mapStateToProps, { getTemplate, removeTemplate, clearResults })(TemplateInfoComponent)