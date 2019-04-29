import React from 'react'
import { connect } from 'react-redux'
import Plot from 'react-plotly.js';

import { calculateTemplate, clearResults } from '../actions'
import history from '../utils/history'

Array.prototype.groupBy = function (prop) {
    return this.reduce(function (groups, item) {
        const val = item[prop]
        groups[val] = groups[val] || []
        groups[val].push(item)
        return groups
    }, {})
}

const chartConfig = {
    aggregateFunctions: {
        "sum": function (calculationResult) {
            var cr = Object.values(calculationResult.groupBy('item1'));
            var toReturn = [];

            cr.forEach(group => {
                var reduceResult = group.reduce((prev, cur) => {
                    return {
                        x: prev.x ? prev.x : cur.item1,
                        y: prev.y ? prev.y + cur.item2 : cur.item2
                    }
                },
                    {});

                toReturn.push(reduceResult);
            });

            return toReturn;
        },
        "percent": function (calculationResult) {
            var cr = Object.values(calculationResult.groupBy('item1'));
            var toReturn = [];

            cr.forEach(group => {
                var reduceResult = group.reduce((prev, cur) => {
                    return {
                        x: prev.x ? prev.x : cur.item1,
                        y: (prev.y ? prev.y + (1 / calculationResult.length) : 1 / calculationResult.length).toFixed(2)
                    }
                },
                    {});

                toReturn.push(reduceResult);
            });

            return toReturn;
        },
        "count": function (calculationResult) {
            var cr = Object.values(calculationResult.groupBy('item1'));
            var toReturn = [];

            cr.forEach(group => {
                var reduceResult = group.reduce((prev, cur) => {
                    return {
                        x: prev.x ? prev.x : cur.item1,
                        y: prev.y ? prev.y + 1 : 1
                    }
                },
                    {});

                toReturn.push(reduceResult);
            });

            return toReturn;
        }
    },
    chartFunctions: {
        "pie": function (aggregateFunctionName, calculationResult) {

            var values = [];
            var labels = [];

            calculationResult.forEach(res => {
                var resY = parseFloat(res.y);

                if (aggregateFunctionName === "percent") {
                    resY *= 100.0;
                }

                values.push(resY);
                labels.push(`${aggregateFunctionName}(${res.x})`);
            });

            return {
                data: [
                    {
                    values: values,
                    labels: labels,
                    type: 'pie'
                }],
                layout: {
                    width: 900,
                    height: 700
                }
            };
        },
        "bar": function (aggregateFunctionName, calculationResult, mapFunction) {
            var x = [];
            var y = [];

            calculationResult.forEach(res => {
                x.push(res.x);

                if (aggregateFunctionName === "percent") {
                    y.push(parseFloat(res.y) * 100.0);
                }
                else {
                    y.push(parseFloat(res.y));
                }
            });

            return {
                data: [
                    {
                    x: x,
                    y: y,
                    type: 'bar'
                }],
                layout: {
                    width: 900,
                    height: 700,
                    title: `${aggregateFunctionName}(${mapFunction})`
                }
            };
        },
        "line": function (aggregateFunctionName, calculationResult, mapFunction) {
            var x = [];
            var y = [];

            calculationResult.forEach(res => {
                x.push(res.x);

                if (aggregateFunctionName === "percent") {
                    y.push(parseFloat(res.y) * 100.0);
                }
                else {
                    y.push(parseFloat(res.y));
                }
            });

            return {
                data: [
                    {
                    x: x,
                    y: y,
                    type: 'scatter'
                }],
                layout: {
                    width: 900,
                    height: 700,
                    title: `${aggregateFunctionName}(${mapFunction})`
                }
            };
        }
    }
};

class TemplateVisualizerComponent extends React.Component {

    componentWillMount() {
        if (!this.props.user.isAuthenticated) {
            history.push('/');
        }
    }

    componentWillUnmount() {
        this.props.clearResults();
    }

    componentDidMount() {
        this.props.calculateTemplate(this.props.match.params.id);
    }

    render() {
        if (this.props.calculationResult) {

            if (this.props.calculationResult.error) {
                return (
                    <div class="alert alert-warning alert-dismissible fade show" role="alert">
                        {this.props.calculationResult.error}
                        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>);
            }

            var calculationResult = this.props.calculationResult.result.calculationResult;
            var aggregateFunction = this.props.calculationResult.result.template.aggregateFunction;
            var chartType = this.props.calculationResult.result.template.chartType;
            var mapFunction = this.props.calculationResult.result.template.mapFunction.returnValue;

            var calculateChartValuesResult = chartConfig.aggregateFunctions[aggregateFunction](calculationResult);
            var plotProps = chartConfig.chartFunctions[chartType](aggregateFunction, calculateChartValuesResult, mapFunction);

            return (
                <div className="row">
                    <div className="col-sm-12">
                        <div className="row">
                            <div className="col-sm-2"></div>
                            <div className="col-sm-8" id="svgContainer">
                                <Plot {...plotProps} />
                            </div>
                        </div>
                    </div>
                </div>
            );
        }

        return <div>Loading...</div>
    }
}

const mapStateToProps = state => {
    return {
        calculationResult: state.templateCalculationResult,
        user: state.auth
    };
}

export default connect(mapStateToProps, { calculateTemplate, clearResults })(TemplateVisualizerComponent)