import React from 'react'
import { connect } from 'react-redux'
import C3Chart from 'react-c3js'
import 'c3/c3.css'
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'

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

            var cols = [];
            calculationResult.forEach(res => {
                var resY = parseFloat(res.y);

                if (aggregateFunctionName === "percent") {
                    resY *= 100.0;
                }

                cols.push([`${aggregateFunctionName}(${res.x})`, resY]);
            });

            return {
                data: {
                    columns: cols,
                    type: 'pie'
                },
                pie: {
                    label: {
                        format: function (value) {
                            if (aggregateFunctionName === "percent") {
                                return value + '%';
                            }

                            return value;
                        }
                    }
                }
            };
        },
        "bar": function (aggregateFunctionName, calculationResult, mapFunction) {
            var x = ['x'];
            var y = [`${aggregateFunctionName}(${mapFunction})`];

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
                data: {
                    x: 'x',
                    columns: [
                        x,
                        y
                    ],
                    type: 'bar'
                },
                axis: {
                    x: {
                        type: 'category',
                        tick: {
                            rotate: 75,
                            multiline: false
                        },
                        height: 130
                    },
                    y: {
                        tick: {
                            format: function (value) {
                                if (aggregateFunctionName === "percent") {
                                    return value + '%';
                                }

                                return value;
                            }
                        }
                    }
                }
            };
        },
        "line": function (aggregateFunctionName, calculationResult, mapFunction) {
            var x = ['x'];
            var y = [`${aggregateFunctionName}(${mapFunction})`];

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
                data: {
                    x: 'x',
                    columns: [
                        x,
                        y
                    ]
                },
                axis: {
                    x: {
                        type: 'category',
                        tick: {
                            rotate: 75,
                            multiline: false
                        },
                        height: 130
                    },
                    y: {
                        tick: {
                            format: function (value) {
                                if (aggregateFunctionName === "percent") {
                                    return value + '%';
                                }

                                return value;
                            }
                        }
                    }
                }
            };
        }
    }
};

class TemplateVisualizerComponent extends React.Component {

    componentWillMount(){
        if(!this.props.user.isAuthenticated){
            history.push('/');
        }
    }

    componentWillUnmount(){
        this.props.clearResults();
    }

    componentDidMount() {
        this.props.calculateTemplate(this.props.match.params.id);
    }

    pdfExport = () => {
        var svg = document.getElementById('svgContainer');

        html2canvas(svg)
            .then(svg => {
                const imgData = svg.toDataURL('image/png');
                const pdf = new jsPDF();
                pdf.addImage(imgData, 'PNG', 0, 0);
                pdf.save("download.pdf");
            });
    }

    render() {
        if (this.props.calculationResult) {

            if(this.props.calculationResult.error){
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
            var c3Props = chartConfig.chartFunctions[chartType](aggregateFunction, calculateChartValuesResult, mapFunction);

            return (
                <div className="row">
                    <div className="col-sm-12">
                        <div className="row">
                            <div className="col-sm-2"></div>
                            <div className="col-sm-8" id="svgContainer">
                                <C3Chart {...c3Props} />
                            </div>
                        </div>
                        <br />
                        <br />
                        <div className="row">
                            <div className="col-md-5"></div>
                            <div className="col-md-2">
                                <button
                                    className="btn btn-block btn-info"
                                    onClick={this.pdfExport}>
                                    Export to PDF
                                </button>
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