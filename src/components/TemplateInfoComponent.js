import React from 'react'
import { connect } from 'react-redux'

import { getTemplate } from '../actions'

class TemplateInfoComponent extends React.Component {
    componentDidMount(){
        this.props.getTemplate(this.props.match.params.id);
    }

    removeTemplate = () => {
        
    };

    renderTemplate(){
        if(!this.props.template){
            return <div>Loading...</div>;
        }

        var filter = this.props.template.dataSourceFilter;

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
                                {this.props.template.id}
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
                                {this.props.template.dataSourceId}
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
                                {this.props.template.name}
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
                                {this.props.template.created}
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
                                {this.props.template.keySelector.returnValue}
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
                                {this.props.template.mapFunction.returnValue}
                            </p>
                        </div>
                    </div>
                    <br/>
                    <div className="row">
                        <div className="col-sm-12">
                            <button 
                                type="button" 
                                style={{ margin: '3px' }} 
                                className="btn btn-danger float-right">
                                Remove
                            </button>
                            <button 
                                type="button" 
                                style={{ margin: '3px' }} 
                                className="btn btn-info float-right">
                                Visualize
                            </button>
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
        template: state.currentTemplate
    };
}

export default connect(mapStateToProps, { getTemplate })(TemplateInfoComponent)