import React from 'react'
import { connect } from 'react-redux'
import { setTemplateMapFunction } from '../actions'

class TemplateMapFunctionComponent extends React.Component {

    setTemplateMapFunction = e => {
        this.props.setTemplateMapFunction(e.target.value);
    }

    renderDataSourceKeys = () => {
        var accessibleKeys = [];

        if (this.props.dataSourceKeys && this.props.dataSourceKeys.length > 0) {
            accessibleKeys = this.props.dataSourceKeys.map(item => {
                return <option key={item.fullName} value={item.fullName}>{item.fullName}</option>
            });
        }

        return [
            <option key="0" selected value="0">None</option>,
            ...accessibleKeys];
    }

    render() {
        return (
            <div className="row">
                <div className="col-sm-12">
                    <div className="form-group">
                        <label htmlFor="mapFunction">Map function: </label>
                        <select 
                        name="mapFunction" 
                        className="form-control"
                        onChange={this.setTemplateMapFunction}>
                            {this.renderDataSourceKeys()}
                        </select>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {

    if (!state.templateDataSource) {
        return {
            dataSourceKeys: null
        };
    }

    return {
        dataSourceKeys: state.templateDataSource.schema
    };
}

export default connect(mapStateToProps, { setTemplateMapFunction })(TemplateMapFunctionComponent)