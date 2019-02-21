import React from 'react'
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
                        customStyle={{
                        height: '300px',
                        width: '100%', 
                        border: '1px solid lightblue',
                        borderRadius: '3px' }} />
                </div>
                <div className="col-md-4">
                    <ChartTypeComponent
                        chartType="bar"
                        chartName="Bar"
                        imageSrc="./images/bar.png"
                        customStyle={{
                            height: '300px',
                            width: '100%', 
                            border: '1px solid lightblue',
                            borderRadius: '3px' }} />
                </div>
                <div className="col-md-4">
                    <ChartTypeComponent
                        chartType="function"
                        chartName="Function"
                        imageSrc="./images/func.png"
                        customStyle={{
                            height: '300px',
                            width: '100%', 
                            border: '1px solid lightblue',
                            borderRadius: '3px' }} />
                </div>
            </div>
        );
    }
}

export default TemplateChartTypeComponent;