import React from 'react'
import { connect } from 'react-redux'
import { calculateTemplate } from '../actions'

class TemplateVisualizerComponent extends React.Component {
    componentDidMount(){
        this.props.calculateTemplate(this.props.match.params.id);
    }

    render(){
        return (
            <div>{JSON.stringify(this.props.calculationResult)}</div>
        );
    }
}

const mapStateToProps = state => {
    return {
        calculationResult: state.templateCalculationResult
    };
}

export default connect(mapStateToProps, { calculateTemplate })(TemplateVisualizerComponent)