import React from 'react'
import { connect } from 'react-redux'
import { getDataSource, updateDataSource } from '../actions'

const required = value => value ? undefined : 'Required'

class DataSourceEditFormComponent extends React.Component {

    constructor(props, context) {
        super(props, context);

        this.state = {
            dataSourceName: null
        };
    }

    componentDidMount() {
        this.props.getDataSource(this.props.match.params.id);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            dataSourceName: nextProps.dataSource.name,
            dataSourceNameAlert: null
        });
    }

    updateDataSourceName = event => {
        if (!event.target.value) {
            this.setState({ dataSourceNameAlert: 'Data source name cannot be empty' });
        }
        else {
            this.setState({ dataSourceNameAlert: null });
        }
        this.setState({ dataSourceName: event.target.value });
    }

    submitChanges = () => {
        this.props.updateDataSource(
            this.props.match.params.id,
            this.state.dataSourceName
        );
    }

    renderConditional = () => {
        if (!this.props.dataSource) {
            return (
                <div>Loading...</div>
            );
        }
        else {
            return (
                <div className="row">
                    <div className="col-sm-3"></div>
                    <div
                        className="col-sm-6"
                        style={{
                            backgroundColor: '#F6F2F2',
                            borderRadius: '5px',
                            padding: '10px',
                            marginTop: '30px'
                        }}>
                        <div className="row">
                            <div className="col-sm-12">
                                <button type="button" style={{ margin: '3px' }} className="btn btn-danger float-right">Remove</button>
                                <button 
                                type="button" 
                                style={{ margin: '3px' }} 
                                className="btn btn-info float-right"
                                disabled={this.state.dataSourceNameAlert !== null}
                                onClick={this.submitChanges}>Save</button>
                            </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="dataSourceName">Data source name:</label>
                            <input
                                type="text"
                                name="dataSourceName"
                                className="form-control"
                                value={this.state.dataSourceName}
                                onChange={this.updateDataSourceName} />
                            <span style={{ color: 'red' }}>{this.state.dataSourceNameAlert}</span>
                        </div>
                        <div className="row">
                            <div className="col-sm-12">
                                <label>Created: {new Date(this.props.dataSource.created).toUTCString()}</label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-sm-12">
                                <label>Schema:</label>
                                <pre>{JSON.stringify(this.props.dataSource.schema, null, "\t")}</pre>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
    }

    render() {
        return this.renderConditional();
    }
}

function mapStateToProps(state) {
    return {
        dataSource: state.currentDataSource
    };
}

export default connect(mapStateToProps, { getDataSource, updateDataSource })(DataSourceEditFormComponent)