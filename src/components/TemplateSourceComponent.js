import React from 'react'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'

import { setTemplateName, setTemplateDataSource } from '../actions'
import { renderField } from '../utils/renderField'
import { required } from '../utils/validations';

class TemplateSourceComponent extends React.Component {

    renderDataSourceSchemaElement = dataSources => {
        var accessibleSources = [];

        if (dataSources && dataSources.length > 0) {
            accessibleSources = dataSources.map(item => {
                return <option key={item.id} value={item.id}>{item.name}: {item.id}</option>
            });
        }

    return [
    <option key="0" selected value="00000000-0000-0000-0000-000000000000">None</option>,
    ...accessibleSources];
    }

    setTemplateName = e => {
        this.props.setTemplateName(e.target.value);
    }

    setTemplateDataSource = e => {
        this.props.setTemplateDataSource(e.target.value);
    }

    render() {
        return (
            <div className="row">
                <div className="col-sm-12">
                    <Field
                        component={renderField}
                        type="text"
                        name="templateName"
                        className="form-control"
                        label="Template name"
                        onChange={this.setTemplateName}
                        validate={[required]} />
                    <div className="form-group">
                        <label htmlFor="dataSource">Data source: </label>
                        <select name="dataSource" className="form-control" onChange={this.setTemplateDataSource}>
                            {this.renderDataSourceSchemaElement(this.props.dataSources)}
                        </select>
                    </div>
                </div>
            </div>
        );
    }
}

var createReduxForm = reduxForm({
    form: 'templateSource',
})(TemplateSourceComponent)

export default connect(null, { setTemplateName, setTemplateDataSource })(createReduxForm);