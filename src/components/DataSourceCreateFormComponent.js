import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form'
import FileInput from './FileInput'
import {createDataSource} from '../actions'

const renderField = ({
    input,
    type,
    label,
    placeholder,
    id,
    name,
    meta: { touched, error, warning } }) => (
        <div className="form-group">
            <label htmlFor={id}>{label}:</label>
            <input {...input} 
            placeholder={placeholder} 
            type={type} 
            className="form-control" 
            id={id}
            name={name}/>
            {touched && ((error && <span style={{color: 'darkred'}}>{error}</span>) 
            || (warning && <span style={{color: 'darkred'}}>{warning}</span>))}
        </div>
    )

const required = value => value ? undefined : 'Required'
const xml = value => value.type === 'text/xml' ? undefined : 'File must be in XML format'

class DataSourceCreateFormComponent extends React.Component {
    render() {
        return (
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
                    </form>
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

var createReduxForm = reduxForm({
    form: 'createDataSource',
})(DataSourceCreateFormComponent)

export default connect(null, { createDataSource })(createReduxForm)

