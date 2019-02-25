import React from 'react'
import { connect } from 'react-redux'
import { setTemplateAggregateFunction } from '../actions'

class TemplateAggregateFunctionComponent extends React.Component {

    setTemplateAggregateFunction = e => {
        this.props.setTemplateAggregateFunction(e.target.value);
    }

    render(){
        return (
            <div className="form-group">
                <label htmlFor="aggregateFunction">
                    Aggregate function:
                </label>
                <select 
                    className="form-control"
                    name="aggregateFunction"
                    onChange={this.setTemplateAggregateFunction}>
                    <option value="percent">Percent</option>
                    <option value="sum">Sum</option>
                    <option value="count">Count</option>
                </select>
            </div>
        );
    }
}

export default connect(null, { setTemplateAggregateFunction })(TemplateAggregateFunctionComponent)