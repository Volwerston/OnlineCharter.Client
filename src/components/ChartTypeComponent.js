import React from 'react'
import { connect } from 'react-redux'
import { setTemplateChartType } from '../actions'

class ChartTypeComponent extends React.Component {

    setTemplateChartType = () => {
        this.props.setTemplateChartType(this.props.chartType);
    }

    render(){

        var className = "row chart-type"
        if(this.props.chartType === this.props.selectedChartType){
            className = "row selected-chart-type";
        }

        return (
            <div 
                className={className} 
                style={this.props.customStyle} 
                onClick={this.setTemplateChartType}>
                <div className="col-sm-12" style={{margin: '10px'}}>
                    <img 
                    className="img-responsive" 
                    style={{ 
                        height: '200px',
                        display: 'block',
                        marginLeft: 'auto',
                        marginRight: 'auto',
                        width: '70%' }} 
                    src={this.props.imageSrc} />
                </div>
                <div className="col-sm-12">
                    <h3 className="text-center">{this.props.chartName} chart</h3>
                </div>          
            </div>
        );
    }
}

export default connect(null, { setTemplateChartType })(ChartTypeComponent)