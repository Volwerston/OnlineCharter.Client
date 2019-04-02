import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form'
import FileInput from './FileInput'
import { createDataSource, clearResults } from '../actions'
import { renderField } from '../utils/renderField'
import { required, xml } from '../utils/validations'
import history from '../utils/history'
import DataSourceUploadProcessComponent from './DataSourceUploadProcessComponent'

class DataSourceCreateFormComponent extends React.Component {
    componentWillMount() {
        if (!this.props.user.isAuthenticated) {
            history.push('/');
        }
    }

    componentWillUnmount() {
        this.props.clearResults();
    }

    render() {

        var errorMessage = null;

        if (this.props.createDataSourceResult && this.props.createDataSourceResult.error) {
            errorMessage = (
                <div class="alert alert-warning alert-dismissible fade show" role="alert">
                    {this.props.createDataSourceResult.error}
                    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
            );
        }

        var statusCheck = null;
        if (this.props.createDataSourceResult && this.props.createDataSourceResult.result) {
            statusCheck = (
                <DataSourceUploadProcessComponent
                    dataSourceId={this.props.createDataSourceResult.result}
                />
            );
        }

        return (
            <div>
                <div className="row">
                    {errorMessage}
                </div>
                <div className="row">
                    <div className="col-sm-3"></div>
                    <div className="col-sm-6">
                        <form style={{
                            borderRadius: '5px',
                            backgroundColor: '#F6F2F2',
                            padding: '10px',
                            marginTop: '30px'
                        }}
                            onSubmit={this.props.handleSubmit(this.onSubmit)} >
                            <Field
                                name="dataSourceName"
                                id="dataSourceName"
                                component={renderField}
                                type="text"
                                placeholder="Name"
                                className="form-control"
                                label="Data source name"
                                validate={[required]} />
                            <Field
                                name="dataSource"
                                id="dataSource"
                                component={FileInput}
                                type="file"
                                placeholder="Select Data Source"
                                label="Data source"
                                accept=".xml"
                                validate={[required, xml]} />
                            <div className="row">
                                <div className="col-sm-4">
                                </div>
                                <div className="col-sm-4">
                                    <button className="btn btn-info btn-block" type="submit">Submit</button>
                                </div>
                            </div>
                            <br/>
                            <br/>
                            <div className="row">
                                <div className="col-sm-12">
                                    {statusCheck}
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }

    onSubmit = values => {
        this.props.createDataSource({
            name: values.dataSourceName,
            dataSource: values.dataSource
        });
    }
}

const mapStateToProps = state => {
    return {
        user: state.auth,
        createDataSourceResult: state.createDataSourceResult
    }
};

var createReduxForm = reduxForm({
    form: 'createDataSource',
})(DataSourceCreateFormComponent)

export default connect(mapStateToProps, { createDataSource, clearResults })(createReduxForm)