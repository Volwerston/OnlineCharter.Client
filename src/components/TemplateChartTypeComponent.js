import React from 'react'
import { connect } from 'react-redux'

import ChartTypeComponent from './ChartTypeComponent'

class TemplateChartTypeComponent extends React.Component {
    render(){
        return (
            <div className="row" style={{ marginLeft: '25px'}}>
                <div className="col-md-4">
                    <ChartTypeComponent
                        chartType="pie"
                        chartName="Pie"
                        imageSrc="./images/pie.jpg"
                        customStyle={{ height: '300px', width: '100%' }}
                        selectedChartType={ this.props.selectedChartType } />
                </div>
                <div className="col-md-4">
                    <ChartTypeComponent
                        chartType="bar"
                        chartName="Bar"
                        imageSrc="./images/bar.png"
                        customStyle={{ height: '300px', width: '100%' }} 
                        selectedChartType={ this.props.selectedChartType }/>
                </div>
                <div className="col-md-4">
                    <ChartTypeComponent
                        chartType="line"
                        chartName="Line"
                        imageSrc="./images/line.jpg"
                        customStyle={{ height: '300px', width: '100%' }} 
                        selectedChartType={ this.props.selectedChartType }/>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        selectedChartType: state.templateChartType
    };
}

export default connect(mapStateToProps)(TemplateChartTypeComponent)