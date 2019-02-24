import React from 'react'
import { connect } from 'react-redux'
import {
    setTemplateDataSourceFilterLeftValue,
    setTemplateDataSourceFilterRightValue,
    setTemplateDataSourceFilterComparator
} from '../actions'

class TemplateDataSourceFilterComponent extends React.Component {

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

    setTemplateDataSourceFilterLeftValue = e => {
        this.props.setTemplateDataSourceFilterLeftValue(e.target.value);
    }

    setTemplateDataSourceFilterComparator = e => {
        this.props.setTemplateDataSourceFilterComparator(e.target.value);
    }

    setTemplateDataSourceFilterRightValue = e => {
        this.props.setTemplateDataSourceFilterRightValue(e.target.value);
    }

    render() {
        return (
            <div className="row">
                <div className="col-sm-12">
                    <label>Data source filter:</label>
                </div>
                <div className="col-sm-12">
                    <div className="row">
                        <div className="col-sm-4">
                            <div className="form-group">
                                <select
                                    name="leftValue"
                                    className="form-control"
                                    onChange={this.setTemplateDataSourceFilterLeftValue}>
                                    {this.renderDataSourceKeys()}
                                </select>
                            </div>
                        </div>
                        <div className="col-sm-4">
                            <select
                                name="comparator"
                                className="form-control"
                                onChange={this.setTemplateDataSourceFilterComparator}>
                                <option value="=">=</option>
                                <option value="!=">!=</option>
                                <option value="<">{'\u003C'}</option>
                                <option value=">">{'\u003E'}</option>
                                <option value="<=">{'\u2264'}</option>
                                <option value=">=">{'\u2265'}</option>
                            </select>
                        </div>
                        <div className="col-sm-4">
                            <input
                                type="text"
                                className="form-control"
                                name="rightValue"
                                onChange={this.setTemplateDataSourceFilterRightValue}>
                            </input>
                        </div>
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

export default connect(mapStateToProps,
    {
        setTemplateDataSourceFilterLeftValue,
        setTemplateDataSourceFilterComparator,
        setTemplateDataSourceFilterRightValue
    })(TemplateDataSourceFilterComponent)