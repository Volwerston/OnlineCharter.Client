import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form'
import FileInput from './FileInput'

class DataSourceCreateFormComponent extends React.Component {
    render() {
        return (
            <div className="row">
                <div className="col-sm-3"></div>
                <div className="col-sm-6">
                    <form style={{ 
                        borderRadius: '10px solid #F6F2F2', 
                        backgroundColor: '#F6F2F2',
                        padding: '10px',
                        marginTop: '30px'}} 
                        onSubmit={this.props.handleSubmit(this.onSubmit)} >
                        <div className="form-group">
                            <label htmlFor="dataSourceName">Data source name:</label>
                            <Field
                                name="dataSourceName"
                                id="dataSourceName"
                                component="input"
                                type="text"
                                placeholder="Name"
                                className="form-control" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="dataSource">Data source:</label>
                            <br />
                            <Field
                                name="dataSource"
                                id="dataSource"
                                component={FileInput}
                                type="file"
                                placeholder="Select Data Source" />
                        </div>
                        <div className="row">
                            <div className="col-sm-4">
                            </div>
                            <div className="col-sm-4">
                                <button className="btn btn-info btn-block" type="submit">Submit</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        );
    }

    onSubmit = (values) => {
        console.log(values);
    }
}

var createReduxForm = reduxForm({
    form: 'createDataSource'
})(DataSourceCreateFormComponent)

export default connect(null)(createReduxForm)

