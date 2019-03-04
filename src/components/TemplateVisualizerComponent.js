import React from 'react'
import { connect } from 'react-redux'
import C3Chart from 'react-c3js'
import 'c3/c3.css'

import { calculateTemplate } from '../actions'

class TemplateVisualizerComponent extends React.Component {
    componentDidMount(){
        this.props.calculateTemplate(this.props.match.params.id);
    }

    render(){
        const data = {
            x: 'x',
            columns: [
              ['x', "5", "15"],
              ['data', 1, 3]
            ],
            type: 'bar'
          };

          const axis ={
            x: {
                type: 'category' // this needed to load string x value
            }
        };
        
        return (
            <div>
                <C3Chart data={data} axis={axis} />
                <div>
                    {JSON.stringify(this.props.calculationResult)}
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