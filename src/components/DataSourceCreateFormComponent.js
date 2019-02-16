import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form'
import FileInput from './FileInput'

class DataSourceCreateFormComponent extends React.Component {
    render(){
        return (
            <form onSubmit={this.props.handleSubmit(this.onSubmit)} >
                <Field 
                name="dataSourceName"
                component="input"
                type="text"
                placeholder="Name" />
                <Field
                name="dataSource"
                component={FileInput} 
                type="file"
                placeholder="Select Data Source" />
                <button type="submit">Submit</button>
            </form>
        );
    }

    onSubmit = (values) => {
        console.log(values);
    }
}

var createReduxForm =  reduxForm({
    form: 'createDataSource' 
  })(DataSourceCreateFormComponent)

export default connect(null)(createReduxForm)

