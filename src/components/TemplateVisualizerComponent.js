import React from 'react'
import { connect } from 'react-redux'
import C3Chart from 'react-c3js'
import 'c3/c3.css'

import { calculateTemplate } from '../actions'

Array.prototype.groupBy = function(prop) {
    return this.reduce(function(groups, item) {
      const val = item[prop]
      groups[val] = groups[val] || []
      groups[val].push(item)
      return groups
    }, {})
  }

const chartConfig = {
    aggregateFunctions: {
        "sum": function(calculationResult){
            var cr = Object.values(calculationResult.groupBy('item1'));
            var toReturn = [];

            cr.forEach(group => {
               var reduceResult = group.reduce((prev, cur) => {
                    return { 
                        x: prev.x ? prev.x : cur.item1,
                        y: prev.y ? prev.y + cur.item2 : cur.item2
                    }
                }, 
                { });

                toReturn.push(reduceResult);
            });
            
            return toReturn;
        },
        "percent": function(calculationResult){
            var cr = Object.values(calculationResult.groupBy('item1'));
            var toReturn = [];

            cr.forEach(group => {
               var reduceResult = group.reduce((prev, cur) => {
                    return { 
                        x: prev.x ? prev.x : cur.item1,
                        y: (prev.y ? prev.y + (1/calculationResult.length) : 1/calculationResult.length).toFixed(2)
                    }
                }, 
                { });

                toReturn.push(reduceResult);
            });
            
            return toReturn;
        },
        "count": function(calculationResult){
            var cr = Object.values(calculationResult.groupBy('item1'));
            var toReturn = [];

            cr.forEach(group => {
               var reduceResult = group.reduce((prev, cur) => {
                    return { 
                        x: prev.x ? prev.x : cur.item1,
                        y: prev.y ? prev.y + 1 : 1
                    }
                }, 
                { });

                toReturn.push(reduceResult);
            });
            
            return toReturn;
        }
    }
};

class TemplateVisualizerComponent extends React.Component {
    componentDidMount(){
        this.props.calculateTemplate(this.props.match.params.id);
    }

    render(){       
        var calculateChartValuesResult = [];

        if(this.props.calculationResult){
            var calculationResult = this.props.calculationResult.calculationResult;
            var aggregateFunction = this.props.calculationResult.template.aggregateFunction;

            calculateChartValuesResult = chartConfig.aggregateFunctions[aggregateFunction](calculationResult);     
        }
        
        return (
            <div>
                <div>
                    {JSON.stringify(this.props.calculationResult)}
                </div>
                <div>
                    ---------------------------------
                </div>
                <div>
                    {JSON.stringify(calculateChartValuesResult)}
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        calculationResult: state.templateCalculationResult
    };
}

export default connect(mapStateToProps, { calculateTemplate })(TemplateVisualizerComponent)